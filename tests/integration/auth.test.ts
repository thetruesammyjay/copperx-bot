import { Telegraf } from 'telegraf';
import { setupBot } from '../../../src/bot/bot';
import { loadConfig } from '../../../src/config';
import { logInfo } from '../../../src/utils/logger';

describe('Authentication Flow', () => {
  let bot: Telegraf;

  beforeAll(() => {
    const config = loadConfig();
    bot = new Telegraf(config.telegramBotToken);
    setupBot(bot);
  });

  test('User should be able to log in, authenticate, and log out', async () => {
    // Simulate /login command
    await bot.handleUpdate({
      message: { text: '/login test@example.com', chat: { id: 123 } },
    });

    // Simulate /auth command
    await bot.handleUpdate({
      message: { text: '/auth 123456', chat: { id: 123 } },
    });

    // Simulate /logout command
    await bot.handleUpdate({
      message: { text: '/logout', chat: { id: 123 } },
    });

    // Verify logs
    expect(logInfo).toHaveBeenCalledWith('OTP sent to test@example.com', 'authentication');
    expect(logInfo).toHaveBeenCalledWith('User authenticated successfully: test@example.com', 'authentication');
    expect(logInfo).toHaveBeenCalledWith('User logged out successfully.', 'authentication');
  });
});