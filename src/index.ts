import { readConfig, setUser } from "./config";
import { CommandsRegistry, registerCommand,  runCommand, handlerLogin } from "./commands_handler";

function main() {
  let registry: CommandsRegistry = {}

  registerCommand(registry, "login", handlerLogin)
}

main();