import { XMLParser } from "fast-xml-parser"
import { channel } from "node:diagnostics_channel"
import { text } from "node:stream/consumers";
import test from "node:test";


export async function fetchRSSFeed(feedURL: string) {
  
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
    const parser = new XMLParser()
    const result = parser.parse(xml, true)

    const channel = result.rss?.channel
    if (!channel) {
      throw new Error('no channel in RSS feed')
    }

    let items: any[] = []
    let validItems: RSSItem[] = []
    
    if (
      !channel.title ||
      !channel.link ||
      !channel.description ||
      !channel.item
    ) {
      throw new Error('One of the required fields is missing from the channel')
    }

    if (Array.isArray(channel.item)) {
      items = channel.item
    } else {
      items.push(channel.item)
    }

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
        item: validItems
      }
    }

    return rss

  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`${err.message}`)
    }
  }
}


type RSSFeed = {
  channel: {
    title: string;
    link: string;
    description: string;
    item: RSSItem[];
  };
};

type RSSItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
};