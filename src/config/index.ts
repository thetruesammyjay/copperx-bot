import * as dotenv from 'dotenv';
import {
  DEFAULT_PUSHER_CLUSTER,
  DEFAULT_PUSHER_KEY,
  DEFAULT_COPPERX_API_BASE_URL,
  ENCRYPTION_KEY,
  RATE_LIMIT,
  SESSION_EXPIRATION_MS,
} from './constants';

// Load environment variables from .env file
dotenv.config();

// Define the configuration interface
export interface Config {
  telegramBotToken: string;
  pusherKey: string;
  pusherCluster: string;
  copperxApiBaseUrl: string;
  encryptionKey: string;
  rateLimit: {
    OTP: {
      maxRequests: number;
      windowMs: number;
    };
  };
  sessionExpirationMs: number; // Add session expiration
}

// Load configuration from environment variables
export const loadConfig = (): Config => {
  const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
  if (!telegramBotToken) {
    throw new Error('TELEGRAM_BOT_TOKEN is not defined in the environment variables.');
  }

  return {
    telegramBotToken,
    pusherKey: process.env.PUSHER_KEY || DEFAULT_PUSHER_KEY,
    pusherCluster: process.env.PUSHER_CLUSTER || DEFAULT_PUSHER_CLUSTER,
    copperxApiBaseUrl: process.env.COPPERX_API_BASE_URL || DEFAULT_COPPERX_API_BASE_URL,
    encryptionKey: process.env.ENCRYPTION_KEY || ENCRYPTION_KEY,
    rateLimit: {
      OTP: {
        maxRequests: parseInt(process.env.OTP_RATE_LIMIT_MAX_REQUESTS || RATE_LIMIT.OTP.MAX_REQUESTS.toString(), 10),
        windowMs: parseInt(process.env.OTP_RATE_LIMIT_WINDOW_MS || RATE_LIMIT.OTP.WINDOW_MS.toString(), 10),
      },
    },
    sessionExpirationMs: SESSION_EXPIRATION_MS, // Add session expiration
  };
};

// Export the configuration object
export const config = loadConfig();