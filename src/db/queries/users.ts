import { db } from "..";
import { users } from "../schema";
import { eq } from "drizzle-orm";

export async function createUser(name: string) {
  const [result] = await db.insert(users).values({ name: name }).returning();
  return result;
}

export async function getUsers(name?: string) {
  if (name) {
    return await db
      .select({name: users.name})
      .from(users)
      .where(eq(users.name, name))
  }
  return await db
    .select({name: users.name})
    .from(users)
}

export async function deleteUsers() {
  await db.delete(users)
}