import { feeds } from "../schema";
import { db } from "..";
import { eq, sql } from "drizzle-orm";


export async function createFeed(name: string, url: string, userId: string) {
  const [result] = await db.insert(feeds).values({ name: name, url: url, userId: userId}).returning();
  return result;
}

export async function getFeeds() {
  const result = await db.select().from(feeds)
  return result
}

export async function getFeedById(feedId:string) {
  const [result] = await db.select().from(feeds).where(eq(feeds.id, feedId))
  return result
}


export async function getFeedByURL(url:string) {
  const [result] = await db.select().from(feeds).where(eq(feeds.url, url))
  return result
}

export async function markFeedFetched(feedId: string) {
  await db.update(feeds).set({ lastFetchedAt: new Date()}).where(eq(feeds.id, feedId))
}

export async function getNextFeedToFetch() {
  const result = await db.select().from(feeds).orderBy(sql`${feeds.lastFetchedAt} desc nulls first`).limit(1)
  return result
}