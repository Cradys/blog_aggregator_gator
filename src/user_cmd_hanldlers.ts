import { readConfig, setUser } from "./config";
import { getUsers, getUser, createUser, deleteUsers } from "./db/queries/users";
import { fetchRSSFeed } from "./RSSFeed";


export async function login(cmdName: string, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error(`The login handler expects a single argument, the username.\n Usage: ${cmdName} <name>\n`)
  }
  const [username] = args
  const foundUser = await getUser(username)

  if (!foundUser) {
    throw new Error(`You can't login to an account that doesn't exist!`)
  }

  setUser(username)
  console.log("User has been set")
}


export async function register(cmdName: string, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error(`The register handler expects a single argument, the username.\n Usage: ${cmdName} <name>\n`)
  }
  
  const [username] = args
  const foundUser = await getUser(username)
   
  if (foundUser) {
    throw new Error(`User already exists`)
  }
  
  try {
    const result = await createUser(username)
    setUser(username)
    console.log(`User ${username} was created`)
    // console.log(result)
  } catch (err) {
    throw new Error((err as Error).message)
  }
}


export async function reset() {
  await deleteUsers()
  return
}


export async function users() {
  const users = await getUsers()
  const currentUser = readConfig().currentUserName

  for (let user of users) {
    console.log(`* ${user.name}${user.name === currentUser? " (current)": ""}`)
  }
}


export async function agg() {
  const url = 'https://www.wagslane.dev/index.xml'
  const response = await fetchRSSFeed(url)

  console.log(JSON.stringify(response, null, 2))
}


