import { getPostsForUser } from "src/db/queries/posts";
import { User } from "src/db/schema";


export async function browse(cmdName:string, user: User, ...args: string[]) {
  if (args.length > 1) {
    throw new Error(`To many arguments: ${cmdName} <limit> (${cmdName} 5)`)
  }

  if (args.length === 1 && Number.isInteger(args[0])) {
    throw new Error(`Argument must be integer: ${cmdName} 5`)
  }
  
  const arg = isNaN(Number(args[0]))? 2: Number(args[0])

  const limit = 
    arg > 20? 20: 
    arg <= 0? 1: arg

  const posts = await getPostsForUser(user, limit)

  console.log(`Total posts: ${posts.length}`)

  for (let post of posts) {
    console.log(`Title:             ${post.title}`)
    console.log(`description:       ${post.description?.slice(0, 50)}...`)
    console.log(`url:               ${post.url}`)
    console.log(`publishedAt:       ${post.publishedAt}`)
    console.log(`createdAt:         ${post.createdAt}`)
    console.log(`====================================`)
  }
}