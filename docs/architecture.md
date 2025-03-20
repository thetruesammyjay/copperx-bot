# Architecture Overview

## Components
1. **Telegram Bot**:
   - Handles user interactions and commands.
   - Uses the `node-telegram-bot-api` library.

2. **Copperx API**:
   - Manages authentication, wallets, and fund transfers.

3. **Pusher**:
   - Provides real-time notifications for deposits.

4. **Session Management**:
   - Stores user session data (email, token) in memory.

5. **Logging**:
   - Uses a custom logger for consistent logging across the bot.

---

## File Structure
```markdown
copperx-telegram-bot/
├── src/
│ ├── bot/
│ │ ├── commands/ # Command handlers
│ │ ├── menus/ # Interactive menus
│ │ ├── middlewares/ # Middleware for authentication
│ │ └── bot.ts # Main bot setup
│ ├── services/ # API service integrations
│ ├── utils/ # Utility functions
│ ├── types/ # TypeScript types
│ ├── config/ # Configuration loader
│ └── index.ts # Entry point
├── doc/ # Documentation
├── tests/ # Test files
├── .env # Environment variables
├── package.json # Dependencies and scripts
└── README.md # Project overview
```
