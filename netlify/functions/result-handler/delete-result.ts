import { eq } from 'drizzle-orm/sql';
import type { CustomRequest } from 'netlify/share/custom-request';
import { getDb } from 'netlify/share/db';
import { results } from 'netlify/share/schema';

export async function deleteResult(request: CustomRequest) {
  const id = request.getUrl().searchParams.get('id');
  if (!id) return request.getBadRequestResponse();

  const db = getDb();
  await db.delete(results).where(eq(results.id, id));
  return request.getSuccessRequest(null);
}
