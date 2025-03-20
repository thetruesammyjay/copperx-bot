import { kycCommand } from '../../../src/bot/commands/kyc';
import { Context } from 'telegraf';
import axios from 'axios';
import { loadConfig } from '../../../src/config';
import { logInfo, logError } from '../../../src/utils/logger';

jest.mock('axios');
jest.mock('../../../src/utils/logger');

const config = loadConfig();

describe('KYC Command', () => {
  let ctx: Context;

  beforeEach(() => {
    ctx = {
      message: { text: '/kyc', chat: { id: 123 } },
      reply: jest.fn(),
      session: { token: 'mockToken' },
    } as unknown as Context;
  });

  test('/kyc should check KYC status', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: { approved: true } });

    await kycCommand(ctx);

    expect(axios.get).toHaveBeenCalledWith(`${config.copperxApiBaseUrl}/kycs`, {
      headers: { Authorization: 'Bearer mockToken' },
    });
    expect(ctx.reply).toHaveBeenCalledWith('Your KYC is approved. You can proceed with transactions.');
  });

  test('/kyc should handle errors', async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error('Failed to check KYC status'));

    await kycCommand(ctx);

    expect(ctx.reply).toHaveBeenCalledWith('Failed to check KYC status. Please try again later.');
  });
});