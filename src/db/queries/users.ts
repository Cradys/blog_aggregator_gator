import { db } from "..";
import { users } from "../schema";
import { eq } from "drizzle-orm";

export async function createUser(name: string) {
  const [result] = await db.insert(users).values({ name: name }).returning();
  return result;
}

export async function getUser(name: string) {
  const [result] = await db
  .select({name: users.name})
  .from(users)
  .limit(1)
  .where(eq(users.name, name))

  return result
}

export async function deleteUsers() {
  await db.delete(users)
}