import { db } from "..";
import { posts } from "../schema";

export async function createPost(title: string, url: string, description: string, feedId: string, pubDate: Date) {
  const [result] = await db.insert(posts).values({
    title: title, 
    url: url, 
    description: description ?? null,
    feed_id: feedId,
    published_at: pubDate
  })
  return result
} 