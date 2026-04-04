import { db } from "..";
import { feed_follows } from "../schema";
import { eq } from "drizzle-orm";

export async function createFeedFollow(userId:string, feedId: string) {
  const [feedFollow] = await db.insert(feed_follows).values({userId: userId, feedId: feedId}).returning()
  return feedFollow
}

export async function listFeedFollowsByUserId(userId:string) {
  return await db.select().from(feed_follows).where(eq(feed_follows.userId, userId))
}