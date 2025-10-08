import type { CustomRequest } from 'netlify/share/custom-request';
import { getDb } from 'netlify/share/db';
import { eq } from 'drizzle-orm/sql';
import { results } from 'netlify/share/schema';

export async function getResult(request: CustomRequest) {
  const id = request.getUrl().searchParams.get('id');
  if (id) {
    const db = getDb();
    const result = await db.select().from(results).where(eq(results.id, id));
    return request.getSuccessRequest(result);
  }

  const db = getDb();
  const allResults = await db.select().from(results);
  return request.getSuccessRequest(allResults);
}
