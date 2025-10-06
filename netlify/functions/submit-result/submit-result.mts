import { Context } from '@netlify/functions';
import { CustomRequest } from '../../share/custom-request';
import { decrypt } from '../../share/crypto';
import { getDb } from '../../share/db';
import { results } from '../../share/schema';
import { isAfter, isBefore } from 'date-fns';

type Payload = {
  scoreTotal: number;
  scorePercent: number;
  answers?: Array<{ index: number; value: number }>;
  token?: string | null;
};

export default async (request: Request, context: Context) => {
  const customRequest = new CustomRequest(request);
  try {
    if (customRequest.isCorsPreflight()) return customRequest.getCorsResponse();
    if (customRequest.method !== 'POST') return customRequest.getInvalideMethodResponse();

    const origin = customRequest.headers.get('origin');
    const body = await request.json().catch(() => null);
    if (!body) return customRequest.getBadRequestResponse();

    const { scoreTotal, scorePercent, answers, token }: Payload = body;
    if (!isValidScores(scoreTotal, scorePercent)) return customRequest.getBadRequestResponse();
    if (answers && !isValidAnswers(answers)) return customRequest.getBadRequestResponse();

    if (token && !isTokenCurrentlyValid(token)) return customRequest.getUnauthorizedResponse();

    const userAgent = customRequest.headers.get('user-agent') ?? undefined;
    const ip = (customRequest.headers.get('x-forwarded-for') ?? '').split(',')[0]?.trim();
    const ipHash = ip ? await sha256(ip + (process.env.ENCRYPTION_KEY || '')) : undefined;

    const db = getDb();
    await db.insert(results).values({
      scoreTotal,
      scorePercent,
      answers: answers as any,
      token: token ?? undefined,
      userAgent,
      ipHash,
    });

    return customRequest.getSuccessRequest({ ok: true });
  } catch (error) {
    return customRequest.getInternalErrorResponse(error as Error);
  }
};

function isValidScores(total: number, percent: number): boolean {
  if (!Number.isFinite(total) || !Number.isFinite(percent)) return false;
  if (total < 0 || total > 200) return false; // 50 q * max 4
  if (percent < 0 || percent > 100) return false;
  return true;
}

function isValidAnswers(answers: Array<{ index: number; value: number }>): boolean {
  if (!Array.isArray(answers)) return false;
  if (answers.length > 50) return false;
  for (const a of answers) {
    if (!Number.isInteger(a.index) || a.index < 0 || a.index > 49) return false;
    if (!Number.isInteger(a.value) || a.value < 0 || a.value > 4) return false;
  }
  return true;
}

function isTokenCurrentlyValid(token: string): boolean {
  try {
    const [fromDatetimeStamp, toDateTimestamp] = decrypt(token)
      .split('-')
      .map((d) => parseInt(d));
    const fromDate = new Date(fromDatetimeStamp);
    const toDate = new Date(toDateTimestamp);
    const now = new Date();
    return isBefore(now, toDate) && isAfter(now, fromDate);
  } catch {
    return false;
  }
}

async function sha256(value: string): Promise<string> {
  const enc = new TextEncoder().encode(value);
  const buf = await crypto.subtle.digest('SHA-256', enc);
  const bytes = Array.from(new Uint8Array(buf));
  return bytes.map((b) => b.toString(16).padStart(2, '0')).join('');
}


