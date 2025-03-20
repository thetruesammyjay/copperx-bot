import { Markup } from 'telegraf';
import { Context } from 'telegraf';
import { SessionData } from '../../types/session';

// Extend the Context type to include session
declare module 'telegraf' {
  interface Context {
    session: SessionData;
  }
}

// Main menu with buttons
export const mainMenu = Markup.keyboard([
  ['💰 Balance', '📤 Send'],
  ['📥 Withdraw', '🆘 Help'],
  ['🔐 Logout', '📝 KYC'],
]).resize();

// Setup main menu
export const setupMainMenu = (bot: any) => {
  bot.command('start', (ctx: Context) => {
    ctx.reply('Welcome to Copperx Payout Bot!', mainMenu);
  });

  bot.hears('💰 Balance', (ctx: Context) => ctx.reply('Use /balance to check your wallet balances.'));
  bot.hears('📤 Send', (ctx: Context) => ctx.reply('Use /send to transfer funds.'));
  bot.hears('📥 Withdraw', (ctx: Context) => ctx.reply('Use /withdraw to withdraw funds.'));
  bot.hears('🆘 Help', (ctx: Context) => ctx.reply('Use /help for a list of commands.'));
  bot.hears('🔐 Logout', (ctx: Context) => ctx.reply('Use /logout to log out.'));
  bot.hears('📝 KYC', (ctx: Context) => ctx.reply('Use /kyc to check your KYC status.'));
};