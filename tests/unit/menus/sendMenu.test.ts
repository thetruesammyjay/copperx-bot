import { Telegraf } from 'telegraf';
import { Context } from 'telegraf'; 
import { setupSendMenu } from '../../../src/bot/menus/sendMenu';

describe('Send Menu', () => {
  let bot: Telegraf;

  beforeEach(() => {
    bot = new Telegraf('mock-token');
    setupSendMenu(bot);
  });

  test('should display send menu options', async () => {
    const ctx = {
      reply: jest.fn(),
      message: { text: '📤 Send', chat: { id: 123, type: 'private' } }, // Add required properties
    } as unknown as Context;

    await bot.handleUpdate({ message: { text: '📤 Send', chat: { id: 123, type: 'private' } } });

    expect(ctx.reply).toHaveBeenCalledWith('Choose recipient type:', expect.any(Object));
  });

  test('should handle send email action', async () => {
    const ctx = {
      reply: jest.fn(),
      callbackQuery: { data: 'send_email', message: { chat: { id: 123, type: 'private' } } }, // Add required properties
    } as unknown as Context;

    await bot.handleUpdate({ callback_query: { data: 'send_email', message: { chat: { id: 123, type: 'private' } } });

    expect(ctx.reply).toHaveBeenCalledWith('Please use the command: /send email <email> <amount>');
  });

  test('should handle send wallet action', async () => {
    const ctx = {
      reply: jest.fn(),
      callbackQuery: { data: 'send_wallet', message: { chat: { id: 123, type: 'private' } } }, // Add required properties
    } as unknown as Context;

    await bot.handleUpdate({ callback_query: { data: 'send_wallet', message: { chat: { id: 123, type: 'private' } } });

    expect(ctx.reply).toHaveBeenCalledWith('Please use the command: /send wallet <address> <amount>');
  });

  test('should handle back to main menu action', async () => {
    const ctx = {
      reply: jest.fn(),
      callbackQuery: { data: 'back_to_main', message: { chat: { id: 123, type: 'private' } } }, // Add required properties
    } as unknown as Context;

    await bot.handleUpdate({ callback_query: { data: 'back_to_main', message: { chat: { id: 123, type: 'private' } } });

    expect(ctx.reply).toHaveBeenCalledWith('Returning to the main menu.', expect.any(Object));
  });
});