import { Markup } from 'telegraf';
import { Context } from 'telegraf';
import { mainMenu } from './mainMenu'; // Import the mainMenu

// Send menu with inline buttons
export const sendMenu = Markup.inlineKeyboard([
  Markup.button.callback('Send to Email', 'send_email'),
  Markup.button.callback('Send to Wallet', 'send_wallet'),
  Markup.button.callback('Back to Main Menu', 'back_to_main'),
]);

// Setup send menu
export const setupSendMenu = (bot: any) => {
  bot.hears('📤 Send', (ctx: Context) => {
    ctx.reply('Choose recipient type:', sendMenu);
  });

  bot.action('send_email', (ctx: Context) => {
    ctx.reply('Please use the command: /send email <email> <amount>');
  });

  bot.action('send_wallet', (ctx: Context) => {
    ctx.reply('Please use the command: /send wallet <address> <amount>');
  });

  bot.action('back_to_main', (ctx: Context) => {
    ctx.reply('Returning to the main menu.', mainMenu);
  });
};