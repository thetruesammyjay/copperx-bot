import { balanceCommand } from '../../../src/bot/commands/balance';
import { Context } from 'telegraf';
import { getWalletBalances } from '../../../src/services/copperx';
import { logInfo, logError } from '../../../src/utils/logger';

jest.mock('../../../src/services/copperx');
jest.mock('../../../src/utils/logger');

describe('Balance Command', () => {
  let ctx: Context;

  beforeEach(() => {
    ctx = {
      message: { text: '/balance', chat: { id: 123 } },
      reply: jest.fn(),
      session: { token: 'mockToken' },
    } as unknown as Context;
  });

  test('/balance should fetch and display wallet balances', async () => {
    (getWalletBalances as jest.Mock).mockResolvedValue([
      { currency: 'USDC', amount: '100', network: 'Solana' },
    ]);

    await balanceCommand(ctx);

    expect(getWalletBalances).toHaveBeenCalledWith('mockToken');
    expect(ctx.reply).toHaveBeenCalledWith('Your wallet balances:\nUSDC: 100 (Solana)');
  });

  test('/balance should handle errors', async () => {
    (getWalletBalances as jest.Mock).mockRejectedValue(new Error('Failed to fetch balances'));

    await balanceCommand(ctx);

    expect(ctx.reply).toHaveBeenCalledWith('Failed to fetch balances. Please try again later.');
  });
});