import { argv } from "node:process"
import { handlerLogin } from "./command_handlers";
import { CommandsRegistry, registerCommand,  runCommand } from "./commands_handler";

function main() {
  

  const args = argv.slice(2)

  if (args.length < 1) {
    throw new Error("Must be at least one argument")
  }
  let registry: CommandsRegistry = {}

  registerCommand(registry, "login", handlerLogin)

  const command = args[0]
  const argument = args.slice(1)

  runCommand(registry ,command, ...argument)
}

main();