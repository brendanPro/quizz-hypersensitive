import type { CustomRequest } from 'netlify/share/custom-request';
import { getDb } from 'netlify/share/db';
import { results, type InsertResult } from 'netlify/share/schema';

type Payload = {
  scoreTotal: number;
  answers?: Array<{ label: string; value: number }>;
  email: string;
};

export async function saveResult(request: CustomRequest) {
  const body = await request.getBody();
  if (!body) return request.getBadRequestResponse();
  const { scoreTotal, answers, email }: Payload = body;
  if (!isValidScores(scoreTotal)) return request.getBadRequestResponse();
  if (answers && !isValidAnswers(answers)) return request.getBadRequestResponse();
  const newResult: InsertResult = {
    scoreTotal,
    answers,
    email,
  };

  const db = getDb();
  await db.insert(results).values(newResult);

  return request.getCreatedResponse({ ok: true });
}

function isValidScores(total: number): boolean {
  if (!Number.isFinite(total)) return false;
  if (total < 0 || total > 200) return false; // 50 q * max 4
  return true;
}

function isValidAnswers(answers: Array<{ label: string; value: number }>): boolean {
  if (!Array.isArray(answers)) return false;
  if (answers.length !== 50) return false;
  for (const a of answers) {
    if (typeof a.label !== 'string') return false;
    if (!Number.isInteger(a.value) || a.value < 0 || a.value > 4) return false;
  }
  return true;
}
