import { Telegraf } from 'telegraf';
import { loginCommand, authCommand, logoutCommand } from './auth';
import { balanceCommand } from './balance';
import { sendEmailCommand, sendWalletCommand } from './send';
import { withdrawCommand } from './withdraw';
import { kycCommand } from './kyc';
import { helpCommand } from './help';


export const setupCommands = (bot: Telegraf) => {
  bot.command('login', loginCommand);
  bot.command('auth', authCommand);
  bot.command('logout', logoutCommand);
  bot.command('balance', balanceCommand);
  bot.command('send', (ctx) => {
    const args = ctx.message?.text.split(' ');
    if (args?.[1] === 'email') {
      sendEmailCommand(ctx);
    } else if (args?.[1] === 'wallet') {
      sendWalletCommand(ctx);
    } else {
      ctx.reply('Usage: /send email <email> <amount> OR /send wallet <address> <amount>');
    }
  
  });
  bot.command('withdraw', withdrawCommand);
  bot.command('kyc', kycCommand);
  bot.command('help', helpCommand);
};