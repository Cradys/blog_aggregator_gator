import { argv } from "node:process"
import { login, register, reset } from "./command_handlers";
import { CommandsRegistry, registerCommand,  runCommand } from "./commands_handler";

async function  main() {
  

  const args = argv.slice(2)

  if (args.length < 1) {
    throw new Error("Must be at least one argument")
  }
  let registry: CommandsRegistry = {}

  registerCommand(registry, "login", login)
  registerCommand(registry, "register", register)
  registerCommand(registry, "reset", reset)
  
  const command = args[0]
  const argument = args.slice(1)

  await runCommand(registry ,command, ...argument)

  process.exit(0)
}

main();