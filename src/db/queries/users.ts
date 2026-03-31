import { db } from "..";
import { users, feeds } from "../schema";
import { eq } from "drizzle-orm";

export async function createUser(name: string) {
  const [result] = await db.insert(users).values({ name: name }).returning();
  return result;
}

export async function getUsers() {
  return await db
    .select({name: users.name})
    .from(users)
}

export async function getUser(name: string) {
  const [user] = await db
      .select()
      .from(users)
      .where(eq(users.name, name))
  return user
}

export async function getUserId(name: string) {
  return await db
      .select({id: users.id})
      .from(users)
      .where(eq(users.name, name))
}

export async function deleteUsers() {
  await db.delete(feeds)
  await db.delete(users)
}