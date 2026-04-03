import { feeds } from "../schema";
import { db } from "..";
import { getUserByName } from "./users";
import { eq } from "drizzle-orm";


export async function createFeed(name: string, url: string, currentUser: string) {
  const user = await getUserByName(currentUser)
  if (!user.id) {
    throw new Error(`No such user`)
  }
  const [result] = await db.insert(feeds).values({ name: name, url: url, userId: user.id}).returning();
  return result;
}

export async function getFeeds() {
  const result = await db.select().from(feeds)
  return result
}

export async function getFeedByURL(url:string) {
  const [result] = await db.select().from(feeds).where(eq(feeds.url, url))
  return result
}

