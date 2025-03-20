import { Context } from 'telegraf';
import { sendFundsToEmail, sendFundsToWallet } from '../../services/copperx';
import { validateEmail, validateWalletAddress, validateAmount } from '../../utils/validation';
import { SessionData } from '../../types/session';
import { logError, logInfo } from '../../utils/logger';
import { decrypt } from '../../utils/encryption'; // Add decryption utility

declare module 'telegraf' {
  interface Context {
    session: SessionData;
  }
}

// Command: /send email <email> <amount>
export const sendEmailCommand = async (ctx: Context) => {
  if (!('text' in ctx.message!)) {
    return ctx.reply('Please send a text message.');
  }

  const args = ctx.message.text.split(' ');
  if (args.length !== 4) {
    return ctx.reply('Usage: /send email <email> <amount>');
  }

  const [, , email, amount] = args;
  if (!validateEmail(email)) {
    return ctx.reply('Invalid email format.');
  }
  if (!validateAmount(amount)) {
    return ctx.reply('Invalid amount. Please provide a positive number.');
  }

  if (!ctx.session?.token) {
    return ctx.reply('Please log in first using /login.');
  }

  try {
    const token = decrypt(ctx.session.token); // Decrypt the token
    const response = await sendFundsToEmail(token, email, parseFloat(amount));
    ctx.reply(`Funds sent successfully! Transaction ID: ${response.transactionId}`);
    logInfo(`Funds sent to email: ${email}`, 'send');
  } catch (error) {
    logError(error, 'sending funds to email');
    ctx.reply('Failed to send funds. Please try again later.');
  }
};

// Command: /send wallet <address> <amount>
export const sendWalletCommand = async (ctx: Context) => {
  if (!('text' in ctx.message!)) {
    return ctx.reply('Please send a text message.');
  }

  const args = ctx.message.text.split(' ');
  if (args.length !== 4) {
    return ctx.reply('Usage: /send wallet <address> <amount>');
  }

  const [, , address, amount] = args;
  if (!validateWalletAddress(address)) {
    return ctx.reply('Invalid wallet address.');
  }
  if (!validateAmount(amount)) {
    return ctx.reply('Invalid amount. Please provide a positive number.');
  }

  if (!ctx.session?.token) {
    return ctx.reply('Please log in first using /login.');
  }

  try {
    const token = decrypt(ctx.session.token); // Decrypt the token
    const response = await sendFundsToWallet(token, address, parseFloat(amount));
    ctx.reply(`Funds sent successfully! Transaction ID: ${response.transactionId}`);
    logInfo(`Funds sent to wallet: ${address}`, 'send');
  } catch (error) {
    logError(error, 'sending funds to wallet');
    ctx.reply('Failed to send funds. Please try again later.');
  }
};