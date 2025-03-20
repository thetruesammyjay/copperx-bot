import { Context } from 'telegraf';

// Command: /help
export const helpCommand = async (ctx: Context) => {
  const helpMessage = `
📋 *Available Commands:*
/login <email> - Log in with your email
/auth <otp> - Authenticate with OTP
/balance - Check your wallet balances
/send email <email> <amount> - Send funds to an email
/send wallet <address> <amount> - Send funds to a wallet address
/withdraw <bankAccountId> <amount> - Withdraw funds to a bank account
/kyc - Check your KYC status
/help - Show this help message
  `;
  ctx.reply(helpMessage, { parse_mode: 'Markdown' });
};