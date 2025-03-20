import { sendEmailCommand, sendWalletCommand } from '../../../src/bot/commands/send';
import { Context } from 'telegraf';
import { sendFundsToEmail, sendFundsToWallet } from '../../../src/services/copperx';
import { logInfo, logError } from '../../../src/utils/logger';

jest.mock('../../../src/services/copperx');
jest.mock('../../../src/utils/logger');

describe('Send Commands', () => {
  let ctx: Context;

  beforeEach(() => {
    ctx = {
      message: { text: '/send email test@example.com 100', chat: { id: 123 } },
      reply: jest.fn(),
      session: { token: 'mockToken' },
    } as unknown as Context;
  });

  test('/send email should send funds to an email', async () => {
    (sendFundsToEmail as jest.Mock).mockResolvedValue({ transactionId: 'tx123' });

    await sendEmailCommand(ctx);

    expect(sendFundsToEmail).toHaveBeenCalledWith('mockToken', 'test@example.com', 100);
    expect(ctx.reply).toHaveBeenCalledWith('Funds sent successfully! Transaction ID: tx123');
  });

  test('/send wallet should send funds to a wallet address', async () => {
    ctx.message.text = '/send wallet 0x1234567890abcdef 100';
    (sendFundsToWallet as jest.Mock).mockResolvedValue({ transactionId: 'tx123' });

    await sendWalletCommand(ctx);

    expect(sendFundsToWallet).toHaveBeenCalledWith('mockToken', '0x1234567890abcdef', 100);
    expect(ctx.reply).toHaveBeenCalledWith('Funds sent successfully! Transaction ID: tx123');
  });
});