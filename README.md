# gator

## Command Usage

### User Commands
- `register <username>`: Register a new user with the specified username.
- `login <username>`: Login as the specified user.
- `list-users`: List all registered users, highlighting the current user.

### Feed Commands
- `add-feed <name> <url>`: Add a new feed with the specified name and URL.
- `list-feeds`: List all available feeds.
- `follow <url>`: Follow the feed with the specified URL.
- `unfollow <url>`: Unfollow the feed with the specified URL.
- `following`: List all feeds the current user is following.

### Post Commands
- `browse [limit]`: Browse the latest posts from subscribed feeds, with an optional limit on the number of posts displayed, the default limit is 2.

## Maybe TODO
- Add sorting and filtering options to the browse command
- Add pagination to the browse command
- Add concurrency to the agg command so that it can fetch more frequently
- Add a search command that allows for fuzzy searching of posts
- Add bookmarking or liking posts
- Add a TUI that allows you to select a post in the terminal and view it in a more readable format (either in the terminal or open in a browser)
- Add an HTTP API (and authentication/authorization) that allows other users to interact with the service remotely
- Write a service manager that keeps the agg command running in the background and restarts it if it crashes
