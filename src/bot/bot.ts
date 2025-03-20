import { Telegraf, Context } from 'telegraf';
import { Update } from 'telegraf/types';
import LocalSession from 'telegraf-session-local';
import rateLimit from 'telegraf-ratelimit'; // Import rate-limiting middleware
import { setupCommands } from './commands';
import { setupMainMenu } from './menus/mainMenu';
import { setupMiddlewares } from './middlewares';
import { SessionData } from '../types/session';
import { logInfo, logError } from '../utils/logger'; // Import logInfo and logError

// Extend the Context type to include session
declare module 'telegraf' {
  interface Context {
    session: SessionData;
  }
}

// Set up the bot
export const setupBot = (bot: Telegraf<Context<Update>>) => {
  // Set up session middleware
  const session = new LocalSession({ database: 'sessions.json' });
  bot.use(session.middleware());

  // Rate-limiting middleware
  const limitConfig = {
    window: 60 * 60 * 1000, // 1 hour
    limit: 3, // Max 3 requests per hour
    onLimitExceeded: (ctx: Context) => ctx.reply('Rate limit exceeded. Please try again later.'),
  };

  // Apply rate-limiting middleware
  bot.use(rateLimit(limitConfig));

  // Set up middlewares
  setupMiddlewares(bot);

  // Set up commands
  setupCommands(bot);

  // Set up menus
  setupMainMenu(bot);

  // Add /status command
  bot.command('status', (ctx) => {
    ctx.reply('Bot is running and healthy!');
  });

  // Error handling
  bot.catch((error, ctx) => {
    logError(error, 'bot error');
    if (ctx) {
      ctx.reply('An unexpected error occurred. Please try again later.');
    } else {
      console.error('An unexpected error occurred:', error);
    }
  });

  // Start the bot
  bot.launch();
  logInfo('Bot is running...', 'bot');

  // Graceful shutdown
  process.once('SIGINT', () => {
    logInfo('Bot is shutting down (SIGINT)...', 'bot');
    bot.stop('SIGINT');
    process.exit(0);
  });
  process.once('SIGTERM', () => {
    logInfo('Bot is shutting down (SIGTERM)...', 'bot');
    bot.stop('SIGTERM');
    process.exit(0);
  });
};