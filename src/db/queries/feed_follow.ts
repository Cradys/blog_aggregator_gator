import { db } from "..";
import { feed_follows } from "../schema";
import { eq, and } from "drizzle-orm";

export async function createFeedFollow(userId: string, feedId: string) {
  const [feedFollow] = await db.insert(feed_follows).values({userId: userId, feedId: feedId}).returning()
  return feedFollow
}

export async function listFeedFollowsByUserId(userId: string) {
  return await db.select().from(feed_follows).where(eq(feed_follows.userId, userId))
}

export async function deleteFeedFollowByUserId(userId: string, feedId: string) {
  await db.delete(feed_follows).where(and(
    eq(feed_follows.userId, userId),
    eq(feed_follows.feedId, feedId)
  ))
}