import { Telegraf } from 'telegraf';
import { setupBot } from '../../../src/bot/bot';
import { loadConfig } from '../../../src/config';
import { sendFundsToEmail, sendFundsToWallet } from '../../../src/services/copperx';
import { logInfo } from '../../../src/utils/logger';

jest.mock('../../../src/services/copperx');
jest.mock('../../../src/utils/logger');

describe('Fund Transfer Flow', () => {
  let bot: Telegraf;

  beforeAll(() => {
    const config = loadConfig();
    bot = new Telegraf(config.telegramBotToken);
    setupBot(bot);
  });

  test('User should be able to send funds to an email', async () => {
    // Mock send funds response
    (sendFundsToEmail as jest.Mock).mockResolvedValue({ transactionId: 'tx123' });

    // Simulate /send email command
    await bot.handleUpdate({
      message: { text: '/send email test@example.com 100', chat: { id: 123 } },
    });

    // Verify logs
    expect(logInfo).toHaveBeenCalledWith('Funds sent to email: test@example.com', 'send');
  });

  test('User should be able to send funds to a wallet address', async () => {
    // Mock send funds response
    (sendFundsToWallet as jest.Mock).mockResolvedValue({ transactionId: 'tx123' });

    // Simulate /send wallet command
    await bot.handleUpdate({
      message: { text: '/send wallet 0x1234567890abcdef 100', chat: { id: 123 } },
    });

    // Verify logs
    expect(logInfo).toHaveBeenCalledWith('Funds sent to wallet: 0x1234567890abcdef', 'send');
  });
});