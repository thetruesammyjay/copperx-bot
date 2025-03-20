import { Context } from 'telegraf';
import { getWalletBalances } from '../../services/copperx';
import { SessionData } from '../../types/session';
import { logError, logInfo } from '../../utils/logger';
import { decrypt } from '../../utils/encryption'; // Add decryption utility

declare module 'telegraf' {
  interface Context {
    session: SessionData;
  }
}

// Command: /balance
export const balanceCommand = async (ctx: Context) => {
  if (!ctx.session?.token) {
    return ctx.reply('Please log in first using /login.');
  }

  try {
    const token = decrypt(ctx.session.token); // Decrypt the token
    const balances = await getWalletBalances(token);

    const formattedBalances = balances
      .map((balance: any) => `${balance.currency}: ${balance.amount} (${balance.network})`)
      .join('\n');

    logInfo(`Fetched balances for user: ${ctx.session.email}`, 'wallet');
    ctx.reply(`Your wallet balances:\n${formattedBalances}`);
  } catch (error) {
    logError(error, 'fetching balances');
    ctx.reply('Failed to fetch balances. Please try again later.');
  }
};