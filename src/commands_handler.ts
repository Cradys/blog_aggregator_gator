import { setUser } from "./config";

type CommandHandler = (cmdName: string, ...args: string[]) => void;

export type CommandsRegistry = Record<string, CommandHandler>


export function registerCommand(registry: CommandsRegistry, cmdName: string, handler: CommandHandler) {
  registry[cmdName] = handler
  return registry
}


export function runCommand(registry: CommandsRegistry, cmdName: string, ...args: string[]) {
  if (!(cmdName in registry)) {
    throw new Error(`command ${cmdName} not found`)
  }

  registry[cmdName](cmdName, ...args)
}


export function handlerLogin(cmdName: string, ...args: string[]) {
  if (!args) {
    throw new Error("The login handler expects a single argument, the username")
  }
  const username = args[0]
  setUser(username)
  console.log("User has been set")
}



