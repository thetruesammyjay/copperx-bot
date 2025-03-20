import { withdrawCommand } from '../../../src/bot/commands/withdraw';
import { Context } from 'telegraf';
import { withdrawToBank } from '../../../src/services/copperx';
import { logInfo, logError } from '../../../src/utils/logger';

jest.mock('../../../src/services/copperx');
jest.mock('../../../src/utils/logger');

describe('Withdraw Command', () => {
  let ctx: Context;

  beforeEach(() => {
    ctx = {
      message: { text: '/withdraw 123456789 100', chat: { id: 123 } },
      reply: jest.fn(),
      session: { token: 'mockToken' },
    } as unknown as Context;
  });

  test('/withdraw should withdraw funds to a bank account', async () => {
    (withdrawToBank as jest.Mock).mockResolvedValue({ transactionId: 'tx123' });

    await withdrawCommand(ctx);

    expect(withdrawToBank).toHaveBeenCalledWith('mockToken', '123456789', 100);
    expect(ctx.reply).toHaveBeenCalledWith('Withdrawal successful! Transaction ID: tx123');
  });

  test('/withdraw should handle errors', async () => {
    (withdrawToBank as jest.Mock).mockRejectedValue(new Error('Failed to process withdrawal'));

    await withdrawCommand(ctx);

    expect(ctx.reply).toHaveBeenCalledWith('Failed to process withdrawal. Please try again later.');
  });
});