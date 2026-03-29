import { setUser } from "./config";
import { getUser, createUser, deleteUsers } from "./db/queries/users";

export async function login(cmdName: string, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error(`The login handler expects a single argument, the username.\n Usage: ${cmdName} <name>\n`)
  }
  const username = args[0]

  if (!await getUser(username)) {
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
  
  if (await getUser(username)) {
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
