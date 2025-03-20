import { Telegraf } from 'telegraf';
import { setupBot } from '../../../src/bot/bot';
import { loadConfig } from '../../../src/config';
import { withdrawToBank } from '../../../src/services/copperx';
import { logInfo } from '../../../src/utils/logger';

jest.mock('../../../src/services/copperx');
jest.mock('../../../src/utils/logger');

describe('Withdrawal Flow', () => {
  let bot: Telegraf;

  beforeAll(() => {
    const config = loadConfig();
    bot = new Telegraf(config.telegramBotToken);
    setupBot(bot);
  });

  test('User should be able to withdraw funds to a bank account', async () => {
    // Mock withdrawal response
    (withdrawToBank as jest.Mock).mockResolvedValue({ transactionId: 'tx123' });

    // Simulate /withdraw command
    await bot.handleUpdate({
      message: { text: '/withdraw 123456789 100', chat: { id: 123 } },
    });

    // Verify logs
    expect(logInfo).toHaveBeenCalledWith('Withdrawal to bank account: 123456789', 'withdraw');
  });
});