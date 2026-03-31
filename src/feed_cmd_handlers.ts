import { Feed, User } from "./db/schema"
import { createFeed } from "./db/queries/feeds"
import { getUser } from "./db/queries/users"
import { readConfig } from "./config"


export async function addFeed(cmdName: string, ...args: string[]) {
  const name = args[0]
  const url = args[1]
  if (!name || !url) {
    throw new Error('Not enough data for create feed: addfeed <name> <url>')
  }
  const currentUser = readConfig().currentUserName

  const user = await getUser(currentUser)

  const feed = await createFeed(name, url, currentUser)
  
  printFeed(feed, user)
}

function printFeed(feed: Feed, user: User) {
  console.log(`* ID:            ${feed.id}`);
  console.log(`* Created:       ${feed.createdAt}`);
  console.log(`* Updated:       ${feed.updatedAt}`);
  console.log(`* name:          ${feed.name}`);
  console.log(`* URL:           ${feed.url}`);
  console.log(`* User:          ${user.name}`);
}