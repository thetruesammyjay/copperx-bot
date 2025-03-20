import { Context } from 'telegraf';
import { logError } from './logger';

// Handle errors and send user-friendly messages
export const handleError = (ctx: Context, error: any) => {
  logError(error, 'errorHandler');

  if (error.response?.data?.message) {
    ctx.reply(`Error: ${error.response.data.message}`);
  } else {
    ctx.reply('An unexpected error occurred. Please try again later.');
  }
};