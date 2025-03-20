import { loginCommand, authCommand, logoutCommand } from '../../../src/bot/commands/auth';
import { Context } from 'telegraf';
import { requestOTP, authenticateOTP } from '../../../src/services/copperx';
import { logInfo, logError } from '../../../src/utils/logger';

jest.mock('../../../src/services/copperx');
jest.mock('../../../src/utils/logger');

describe('Auth Commands', () => {
  let ctx: Context;

  beforeEach(() => {
    ctx = {
      message: { text: '/login test@example.com', chat: { id: 123 } },
      reply: jest.fn(),
      session: {},
    } as unknown as Context;
  });

  test('/login should request OTP and store email in session', async () => {
    (requestOTP as jest.Mock).mockResolvedValue({});

    await loginCommand(ctx);

    expect(requestOTP).toHaveBeenCalledWith('test@example.com');
    expect(ctx.session.email).toBe('test@example.com');
    expect(ctx.reply).toHaveBeenCalledWith('OTP sent to test@example.com. Please check your email and use /auth <otp> to authenticate.');
  });

  test('/auth should authenticate with OTP and store token in session', async () => {
    ctx.session = { email: 'test@example.com' };
    ctx.message.text = '/auth 123456';
    (authenticateOTP as jest.Mock).mockResolvedValue({ token: 'mockToken' });

    await authCommand(ctx);

    expect(authenticateOTP).toHaveBeenCalledWith('test@example.com', '123456');
    expect(ctx.session.token).toBeDefined();
    expect(ctx.reply).toHaveBeenCalledWith('Authentication successful! You can now use other commands.');
  });

  test('/logout should clear session data', async () => {
    ctx.session = { email: 'test@example.com', token: 'mockToken' };

    await logoutCommand(ctx);

    expect(ctx.session.email).toBeUndefined();
    expect(ctx.session.token).toBeUndefined();
    expect(ctx.reply).toHaveBeenCalledWith('Logged out successfully.');
  });
});