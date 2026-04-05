import { fetchRSSFeed } from "../RSSFeed";
import { getNextFeedToFetch, markFeedFetched } from "src/db/queries/feeds";


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
  

  const url = 'https://www.wagslane.dev/index.xml'
  const response = await fetchRSSFeed(url)

  
  console.log(JSON.stringify(response, null, 2))
}


export async function scrapeFeeds() {
  const [feed] = await getNextFeedToFetch()
  await markFeedFetched(feed.id)
  const fetchedFeeds = await fetchRSSFeed(feed.url)

  for (let feed of fetchedFeeds.channel.items) {
    console.log(`Title *   ${feed.title}`)
    console.log(`=======================`)
  }
}


function parseDuration(durationStr: string) {
  const regex = /^(\d+)(ms|s|m|h)$/;
  const match = durationStr.match(regex);
  return match
}