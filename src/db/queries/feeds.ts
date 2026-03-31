import { db } from "..";
import { feeds } from "../schema";
import { getUserId } from "./users";


export async function createFeed(name: string, url: string, currentUser: string) {
  const userId = await getUserId(currentUser)
  if (!userId[0].id) {
    throw new Error(`No such user`)
  }
  const [result] = await db.insert(feeds).values({ name: name, url: url, userId: userId[0].id}).returning();
  return result;
}