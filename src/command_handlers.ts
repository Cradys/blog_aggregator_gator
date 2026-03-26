import { setUser } from "./config";

export function handlerLogin(cmdName: string, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error(`The login handler expects a single argument, the username.\n Usage: ${cmdName} <name>\n`)
  }
  const username = args[0]
  setUser(username)
  console.log("User has been set")
}
