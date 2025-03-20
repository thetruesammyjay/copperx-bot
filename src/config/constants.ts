// Pusher configuration
export const DEFAULT_PUSHER_CLUSTER = 'us3';
export const DEFAULT_PUSHER_KEY = '6d740f6cd8ee6492743b';

// Copperx API configuration
export const DEFAULT_COPPERX_API_BASE_URL = 'https://income-api.copperx.io/api';

// Encryption key (should be stored securely in production)
export const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'your-secure-encryption-key';

// Rate-limiting settings
export const RATE_LIMIT = {
  OTP: {
    MAX_REQUESTS: 3, // Max OTP requests per hour
    WINDOW_MS: 60 * 60 * 1000, // 1 hour
  },
};

// Session expiration (24 hours)
export const SESSION_EXPIRATION_MS = 24 * 60 * 60 * 1000; // 24 hours in milliseconds