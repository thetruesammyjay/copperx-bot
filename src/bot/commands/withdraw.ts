import { Context } from 'telegraf';
import { withdrawToBank } from '../../services/copperx';
import { validateAmount } from '../../utils/validation';
import { SessionData } from '../../types/session';
import { logError, logInfo } from '../../utils/logger';

declare module 'telegraf' {
  interface Context {
    session: SessionData;
  }
}

// Command: /withdraw <bankAccountId> <amount>
export const withdrawCommand = async (ctx: Context) => {
  // Ensure the message is a text message
  if (!('text' in ctx.message!)) {
    return ctx.reply('Please send a text message.');
  }

  const args = ctx.message.text.split(' ');
  if (args.length !== 3) {
    return ctx.reply('Usage: /withdraw <bankAccountId> <amount>');
  }

  const [, bankAccountId, amount] = args;
  if (!validateAmount(amount)) {
    return ctx.reply('Invalid amount. Please provide a positive number.');
  }

  const token = ctx.session.token;
  if (!token) {
    return ctx.reply('Please log in first using /login.');
  }

  try {
    const response = await withdrawToBank(token, bankAccountId, parseFloat(amount));
    ctx.reply(`Withdrawal successful! Transaction ID: ${response.transactionId}`);
    logInfo(`Withdrawal to bank account: ${bankAccountId}`, 'withdraw');
  } catch (error) {
    logError(error, 'processing withdrawal');
    ctx.reply('Failed to process withdrawal. Please try again later.');
  }
};