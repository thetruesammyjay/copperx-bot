"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SESSION_EXPIRATION_MS = exports.RATE_LIMIT = exports.ENCRYPTION_KEY = exports.DEFAULT_COPPERX_API_BASE_URL = exports.DEFAULT_PUSHER_KEY = exports.DEFAULT_PUSHER_CLUSTER = void 0;
// Pusher configuration
exports.DEFAULT_PUSHER_CLUSTER = 'us3';
exports.DEFAULT_PUSHER_KEY = '6d740f6cd8ee6492743b';
// Copperx API configuration
exports.DEFAULT_COPPERX_API_BASE_URL = 'https://income-api.copperx.io/api';
// Encryption key (should be stored securely in production)
exports.ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'your-secure-encryption-key';
// Rate-limiting settings
exports.RATE_LIMIT = {
    OTP: {
        MAX_REQUESTS: 3, // Max OTP requests per hour
        WINDOW_MS: 60 * 60 * 1000, // 1 hour
    },
};
// Session expiration (24 hours)
exports.SESSION_EXPIRATION_MS = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
