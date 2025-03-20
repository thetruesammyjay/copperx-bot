import { Context } from 'telegraf';
import axios from 'axios';
import { loadConfig } from '../../config';
import { SessionData } from '../../types/session';
import { logError, logInfo } from '../../utils/logger';

const config = loadConfig();

declare module 'telegraf' {
  interface Context {
    session: SessionData;
  }
}

// Command: /kyc
export const kycCommand = async (ctx: Context) => {
  const token = ctx.session.token;
  if (!token) {
    return ctx.reply('Please log in first using /login.');
  }

  try {
    const response = await axios.get(`${config.copperxApiBaseUrl}/kycs`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.data.approved) {
      ctx.reply('Your KYC is approved. You can proceed with transactions.');
    } else {
      ctx.reply('Your KYC is not approved. Please complete KYC at: https://copperx.io/kyc');
    }
    logInfo(`KYC status checked for user: ${ctx.session.email}`, 'kyc');
  } catch (error) {
    logError(error, 'checking KYC status');
    ctx.reply('Failed to check KYC status. Please try again later.');
  }
};