import { Context } from '@netlify/functions';
import { CustomRequest } from '../../share/custom-request';
import { getDb } from '../../share/db';
import { InsertResult, results } from '../../share/schema';

type Payload = {
  scoreTotal: number;
  answers?: Array<{ index: number; value: number }>;
  email: string;
};

export default async (request: Request, context: Context) => {
  const customRequest = new CustomRequest(request);
  try {
    if (customRequest.isCorsPreflight()) return customRequest.getCorsResponse();
    if (!customRequest.isRequestMethodValid()) return customRequest.getInvalideMethodResponse();

    const body = await customRequest.getBody();
    if (!body) return customRequest.getBadRequestResponse();
    const { scoreTotal, answers, email }: Payload = body;
    if (!isValidScores(scoreTotal)) return customRequest.getBadRequestResponse();
    if (answers && !isValidAnswers(answers)) return customRequest.getBadRequestResponse();
    const newResult: InsertResult = {
      scoreTotal,
      answers,
      email,
    };

    const db = getDb();
    await db.insert(results).values(newResult);

    return customRequest.getSuccessRequest({ ok: true });
  } catch (e) {
    return customRequest.getInternalErrorResponse(e);
  }
};

function isValidScores(total: number): boolean {
  if (!Number.isFinite(total)) return false;
  if (total < 0 || total > 200) return false; // 50 q * max 4
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
