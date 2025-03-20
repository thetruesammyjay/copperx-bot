import { Telegraf } from 'telegraf';
import { authMiddleware, guestMiddleware } from './auth';

// Register all middlewares with the bot
export const setupMiddlewares = (bot: Telegraf) => {
  // Apply guest middleware to /login and /auth
  bot.command('login', guestMiddleware);
  bot.command('auth', guestMiddleware);

  // Apply auth middleware to all other commands
  bot.use(authMiddleware);
};