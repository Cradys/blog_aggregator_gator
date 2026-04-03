import { Feed, FeedFollows, User } from "./db/schema"
import { getFeedByURL } from "./db/queries/feeds"
import { getUserByName } from "./db/queries/users"
import { readConfig } from "./config"
import { createFeedFollow } from "./db/queries/feed_follow"

export async function follow(cmdName: string, ...args: string[]) {
  if (args.length < 1) {
    throw new Error(`Must be 1 argument: follow <feed url>`)
  }

  const feedURL = args[0]
  const username = readConfig().currentUserName

  const feed = await getFeedByURL(feedURL)

  if (!feed) {
    console.log(`Feed not found by url ${feedURL}`)
    return
  }

  const user = await getUserByName(username)

  if (!user) {
    throw new Error(`User ${username} not found`)
  }

  const feedFollow = await createFeedFollow(user.id, feed.id)

  printFeedFollow(feed, user, feedFollow)
}

function printFeedFollow(feed: Feed, user: User, feedFollow: FeedFollows) {
  console.log(`* ID:            ${feedFollow.id}`)
  console.log(`* Created:       ${feedFollow.createdAt}`)
  console.log(`* Updated:       ${feedFollow.updatedAt}`)
  console.log(`* Username:      ${user.name}`)
  console.log(`* Feed name:     ${feed.name}`)
}