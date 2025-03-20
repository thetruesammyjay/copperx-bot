# Setup Instructions

## Prerequisites
- Node.js (v16 or higher)
- Telegram Bot Token (from [BotFather](https://core.telegram.org/bots#botfather))
- Copperx API credentials
- Pusher credentials (app ID, key, secret, and cluster)

## Steps

### 1. Clone the Repository
```bash
git clone https://github.com/thetruesammyjay/copperx-telegram-bot.git
cd copperx-telegram-bot
```
### 2. Install Dependencies
```bash
npm install
```
### 3. Set Up Environment Variables
Create a .env file in the root directory and add the following variables:
```plaintext
TELEGRAM_BOT_TOKEN=your-telegram-bot-token
PUSHER_KEY=your-pusher-key
PUSHER_CLUSTER=your-pusher-cluster
PUSHER_SECRET=your-pusher-secret
COPPERX_API_BASE_URL=https://income-api.copperx.io/api
```
### 4. Run the Bot Locally
```bash
npm start
```
### 5. Deploy the Bot
You can deploy the bot using platforms like [Render](https://render.com/) or [Heroku](https://www.heroku.com/). Follow their documentation for deploying Node.js applications.