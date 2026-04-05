import { XMLParser } from "fast-xml-parser"


export async function fetchRSSFeed(feedURL: string): Promise<RSSFeed> {
  
  try {
    const response = await fetch(feedURL, {
      headers: {
        'User-Agent': 'gator'
      }
    })

    if (!response.ok) {
      throw new Error(`failed to fetch feed: ${response.status} ${response.statusText}`);
    }

    const xml = await response.text()
    const parser = new XMLParser({
      processEntities: {
        enabled: true,
        maxTotalExpansions: 5000
      }
    })
    const result = parser.parse(xml, true)

    const channel = result.rss?.channel
    if (!channel) {
      throw new Error('no channel in RSS feed')
    }

    if (
      !channel.title ||
      !channel.link ||
      !channel.description ||
      !channel.item
    ) {
      throw new Error('One of the required fields is missing from the channel')
    }

    let items: any[] = Array.isArray(channel.item)
    ? channel.item
    : [channel.item];

    let validItems: RSSItem[] = []

    for (let item of items) {
      if (
        !item.title || typeof item.title !== "string" ||
        !item.link || typeof item.link !== "string" ||
        !item.description || typeof item.description !== "string" ||
        !item.pubDate || typeof item.pubDate !== "string"
      ) {
        continue
      }

      validItems.push({
        title: item.title,
        link: item.link,
        description: item.description,
        pubDate: item.pubDate 
      })
    }

    const rss: RSSFeed = {
      channel: {
        title: channel.title,
        link: channel.link,
        description: channel.description,
        items: validItems
      }
    }

    return rss

  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`${err.message}`)
    }
    throw new Error('Unknown error occurred')
  }
}


type RSSFeed = {
  channel: {
    title: string;
    link: string;
    description: string;
    items: RSSItem[];
  };
};

type RSSItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
};