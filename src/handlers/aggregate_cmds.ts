import { date } from "drizzle-orm/pg-core";
import { fetchRSSFeed } from "../RSSFeed";
import { getNextFeedToFetch, markFeedFetched } from "src/db/queries/feeds";
import { createPost } from "src/db/queries/posts";


export async function agg(cmdName:string, ...args: string[]) {
  if (args.length < 1) {
    throw new Error(`Must be 1 argument: ${cmdName} <time duration>`)
  }
  
  const match = parseDuration(args[0])
  
  if (!match) {
    throw new Error('To many values or time duration does not match: 100ms, 1s, 2m, 3h')
  }
  const [, time, measure] = match

  let timeBetweenReqs: number

  switch (measure) {
    case "ms":
      timeBetweenReqs = Number(time)
      break
    case "s":
      timeBetweenReqs = Number(time) * 1000
      break
    case "m":
      timeBetweenReqs = Number(time) * 60 * 1000
      break
    case "h":
      timeBetweenReqs = Number(time) * 24 * 60 * 1000
      break
    default:
      throw new Error(`Time measure does not match: ms, s, m, h`)
  }
  
  console.log(`Collecting feeds every ${time}${measure}`)

  await scrapeFeeds().catch(handleError)

  const interval = setInterval(() => {
    scrapeFeeds().catch(handleError)
  }, timeBetweenReqs);

  await new Promise<void>((resolve) => {
    process.on("SIGINT", () => {
      console.log("Shutting down feed aggregator...");
      clearInterval(interval);
      resolve();
    });
  });
}


export async function scrapeFeeds() {
  const [feed] = await getNextFeedToFetch()
  await markFeedFetched(feed.id)

  console.log(`${feed.name} ${feed.url}`)

  const fetchedFeeds = await fetchRSSFeed(feed.url)

  
  console.log(`Total: ${fetchedFeeds.channel.items.length}`)

  

  for (let post of fetchedFeeds.channel.items) {
    await createPost(
      post.title,
      post.link,
      post.description,
      post.pubDate,
      feed.id
    )
    // console.log(`Title *   ${feed.title}`)
    // console.log(`=======================`)
  }
}


function parseDuration(durationStr: string) {
  const regex = /^(\d+)(ms|s|m|h)$/;
  const match = durationStr.match(regex);
  return match
}

function handleError(error: Error) {
  console.log(`Something went wrong - ${error.message}`)
  return Promise.resolve
}