import { Telegraf } from 'telegraf';
import { setupBot } from './bot/bot'; 
import { loadConfig } from './config';
import express, { Request, Response } from 'express';
import { logInfo } from './utils/logger'; 

// Load environment variables
const config = loadConfig();

// Initialize the bot
const bot = new Telegraf(config.telegramBotToken);

// Set up the bot
setupBot(bot);

// Health check endpoint
const app = express();
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

// Start the health check server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  logInfo(`Health check server running on port ${PORT}`, 'health');
  console.log(`Health check server running on port ${PORT}`);
});