import { users } from "../schema";
import { db } from "..";
import { feeds } from "../schema";
import { getUserId } from "./users";
import { eq } from "drizzle-orm";


export async function createFeed(name: string, url: string, currentUser: string) {
  const userId = await getUserId(currentUser)
  if (!userId[0].id) {
    throw new Error(`No such user`)
  }
  const [result] = await db.insert(feeds).values({ name: name, url: url, userId: userId[0].id}).returning();
  return result;
}

export async function getFeeds() {
  const result = await db.select({
    name: feeds.name,
    url: feeds.url,
    username: users.name
  }).from(users).innerJoin(feeds, eq(feeds.userId, users.id))
  return result
}

export type GetFeeds = {
  name: string,
  url: string,
  username: string
}[]
