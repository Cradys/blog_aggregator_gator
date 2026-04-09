# Gator

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