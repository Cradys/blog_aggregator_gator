import { Feed, FeedFollows, User } from "./db/schema"
import { getFeedByURL, getFeedById } from "./db/queries/feeds"
import { getUserByName } from "./db/queries/users"
import { readConfig } from "./config"
import { createFeedFollow, listFeedFollowsByUserId } from "./db/queries/feed_follow"

export async function follow(cmdName: string, user: User, ...args: string[]) {
  if (args.length < 1) {
    throw new Error(`Must be 1 argument: follow <feed url>`)
  }

  const feedURL = args[0]
  const feed = await getFeedByURL(feedURL)

  if (!feed) {
    console.log(`Feed not found by url ${feedURL}`)
    return
  }

  const feedFollow = await createFeedFollow(user.id, feed.id)

  printFeedFollow(feed, user, feedFollow)
}

export async function getFeedFollowsForUser(cmdName: string, user: User, ...args: string[]) {

  const feedFollows = await listFeedFollowsByUserId(user.id)

  if (feedFollows.length === 0) {
    console.log("Any feed isn`t followed by user")
  }

  console.log(`User ${user.name} followe ${feedFollows.length}`)

  for (let feedFollow of feedFollows) {
    const feed = await getFeedById(feedFollow.feedId)

    printFeedFollow(feed, user, feedFollow)
    console.log("======================================")
  }
}

function printFeedFollow(feed: Feed, user: User, feedFollow: FeedFollows) {
  console.log(`* ID:            ${feedFollow.id}`)
  console.log(`* Created:       ${feedFollow.createdAt}`)
  console.log(`* Updated:       ${feedFollow.updatedAt}`)
  console.log(`* Username:      ${user.name}`)
  console.log(`* Feed name:     ${feed.name}`)
}