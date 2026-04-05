import { argv } from "node:process"
import { login, register, reset, users} from "./handlers/user_cmds";
import { addFeed, listFeeds} from "./handlers/feed_cmds";
import { follow, getFeedFollowsForUser, unfollow } from "./handlers/feed_follow_cmds";
import { CommandsRegistry, registerCommand,  runCommand } from "./commands_hdlr";
import { agg } from "./handlers/aggregate_cmds";
import { middlewareLoggedIn } from "./middleware";

async function  main() {
  

  const args = argv.slice(2)

  if (args.length < 1) {
    throw new Error("Must be at least one argument")
  }
  let registry: CommandsRegistry = {}

  registerCommand(registry, "login", login)
  registerCommand(registry, "register", register)
  registerCommand(registry, "reset", reset)
  registerCommand(registry, "users", users)
  registerCommand(registry, "agg", agg)
  registerCommand(registry, "addfeed", middlewareLoggedIn(addFeed))
  registerCommand(registry, "feeds", listFeeds)
  registerCommand(registry, "follow", middlewareLoggedIn(follow))
  registerCommand(registry, "following", middlewareLoggedIn(getFeedFollowsForUser))
  registerCommand(registry, "unfollow", middlewareLoggedIn(unfollow))

  const command = args[0]
  const argument = args.slice(1)

  await runCommand(registry ,command, ...argument)

  process.exit(0)
}

main();