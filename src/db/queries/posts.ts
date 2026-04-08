import { and, desc, eq, getColumns } from "drizzle-orm";
import { db } from "..";
import { feed_follows, feeds, posts, User } from "../schema";

export async function createPost(title: string, url: string, description: string, pubDate: string, feedId: string) {
  const [result] = await db.insert(posts).values({
    title: title, 
    url: url, 
    description: description ?? null,
    feedId: feedId,
    publishedAt: new Date(pubDate)
  })
  return result
} 


export async function getPostsForUser(user: User, limit: number) {
  const result = await db
    .select(getColumns(posts))
    .from(posts)
    .innerJoin(feeds, eq(feeds.id, posts.feedId))
    .innerJoin(feed_follows, and(eq(feed_follows.feedId, feeds.id), eq(feed_follows.userId, user.id)))
    .orderBy(desc(posts.createdAt))
    .limit(limit)
  return result
}