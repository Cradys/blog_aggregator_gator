import { Feed, User } from "./db/schema"
import { createFeed, getFeeds } from "./db/queries/feeds"
import { getUser, getUserById } from "./db/queries/users"
import { createFeedFollow } from "./db/queries/feed_follow"
import { readConfig } from "./config"


export async function addFeed(cmdName: string, user: User, ...args: string[]) {
  if (args.length !== 2) {
    throw new Error('Can not add function, something missing: addfeed <name> <url>')
  }
  const name = args[0]
  const url = args[1]

  const feed = await createFeed(name, url, user.id)
  
  await createFeedFollow(user.id, feed.id)
  
  printFeed(feed, user)
}

export async function listFeeds() {
  const feeds = await getFeeds() 

  if (feeds.length === 0) {
    console.log(`No feeds found.`);
    return;
  }

  console.log(`Found %d feeds:\n`, feeds.length);

  for (let feed of feeds) {
    const user = await getUserById(feed.userId)

    if (!user) {
      throw new Error(`Failed to find user for feed ${feed.id}`);
    }

    printFeed(feed, user)
    console.log(`=====================================`)
  }
  
}

function printFeed(feed: Feed, user: User) {
  console.log(`* ID:            ${feed.id}`);
  console.log(`* Created:       ${feed.createdAt}`);
  console.log(`* Updated:       ${feed.updatedAt}`);
  console.log(`* Name:          ${feed.name}`);
  console.log(`* URL:           ${feed.url}`);
  console.log(`* User:          ${user.name}`);
}

