import { error } from "node:console";
import { db } from "..";
import { feed_follows } from "../schema";

export async function createFeedFollow(userId:string, feedId: string) {
  const [feedFollow] = await db.insert(feed_follows).values({userId: userId, feedId: feedId}).returning()
  return feedFollow
}