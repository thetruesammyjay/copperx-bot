import { Telegraf } from 'telegraf';
import { setupBot } from '../../../src/bot/bot';
import { loadConfig } from '../../../src/config';
import { getWalletBalances } from '../../../src/services/copperx';
import { logInfo } from '../../../src/utils/logger';

jest.mock('../../../src/services/copperx');
jest.mock('../../../src/utils/logger');

describe('Balance Flow', () => {
  let bot: Telegraf;

  beforeAll(() => {
    const config = loadConfig();
    bot = new Telegraf(config.telegramBotToken);
    setupBot(bot);
  });

  test('User should be able to check wallet balances', async () => {
    // Mock wallet balances
    (getWalletBalances as jest.Mock).mockResolvedValue([
      { currency: 'USDC', amount: '100', network: 'Solana' },
    ]);

    // Simulate /balance command
    await bot.handleUpdate({
      message: { text: '/balance', chat: { id: 123 } },
    });

    // Verify logs
    expect(logInfo).toHaveBeenCalledWith('Fetched balances for user: test@example.com', 'wallet');
  });
});