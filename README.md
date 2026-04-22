# StatsBot

A comprehensive Discord bot for tracking and analyzing server statistics in real-time.

## Features

- **Guild Statistics** - Track message counts and activity per guild over time
- **User Leveling** - Per-guild leveling system with exponential XP progression
- **Voice Channel Tracking** - Monitor voice channel usage
- **Message Analytics** - View per-user message counts with guild-level aggregation
- **Activity Leaderboards** - Identify top speakers and most active members

## Quick Start

### Prerequisites

- Node.js 18+
- Discord Bot Token and Client ID from [Discord Developer Portal](https://discord.com/developers)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/LegoLandon7/StatsBot.git
cd StatsBot
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env
```

3. Add your credentials to `.env`:
```
BOT_TOKEN=your_bot_token
CLIENT_ID=your_client_id
```

### Running

Start the bot with:
```bash
npm run dev
```

This will deploy commands, initialize the database, and start the bot.

## Available Commands

- `npm run build` - Compile TypeScript to JavaScript
- `npm run start` - Run compiled bot
- `npm run deploy` - Deploy slash commands
- `npm run view-db` - Display database tables

## Database Schema

- **MESSAGE_STATS** - Per-user, per-guild message counts across 5-minute intervals
- **VC_STATS** - Cumulative voice channel hours per user per guild
- **LEVEL_STATS** - User levels and XP progression per guild

## Development

Built with TypeScript, Discord.js, and better-sqlite3. Uses exponential XP scaling for leveling to balance early and late-game progression.

## Support

Discord: `legomaster_01`

Support Server: https://discord.gg/

Email: contact@llegonetwork.dev

## Legal

[License](LICENSE) | [Terms of Service](https://llegonetwork.dev/tos) | [Privacy Policy](https://llegonetwork.dev/privacy)
