"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.loadConfig = void 0;
const dotenv = __importStar(require("dotenv"));
const constants_1 = require("./constants");
// Load environment variables from .env file
dotenv.config();
// Load configuration from environment variables
const loadConfig = () => {
    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
    if (!telegramBotToken) {
        throw new Error('TELEGRAM_BOT_TOKEN is not defined in the environment variables.');
    }
    return {
        telegramBotToken,
        pusherKey: process.env.PUSHER_KEY || constants_1.DEFAULT_PUSHER_KEY,
        pusherCluster: process.env.PUSHER_CLUSTER || constants_1.DEFAULT_PUSHER_CLUSTER,
        copperxApiBaseUrl: process.env.COPPERX_API_BASE_URL || constants_1.DEFAULT_COPPERX_API_BASE_URL,
        encryptionKey: process.env.ENCRYPTION_KEY || constants_1.ENCRYPTION_KEY,
        rateLimit: {
            OTP: {
                maxRequests: parseInt(process.env.OTP_RATE_LIMIT_MAX_REQUESTS || constants_1.RATE_LIMIT.OTP.MAX_REQUESTS.toString(), 10),
                windowMs: parseInt(process.env.OTP_RATE_LIMIT_WINDOW_MS || constants_1.RATE_LIMIT.OTP.WINDOW_MS.toString(), 10),
            },
        },
        sessionExpirationMs: constants_1.SESSION_EXPIRATION_MS, // Add session expiration
    };
};
exports.loadConfig = loadConfig;
// Export the configuration object
exports.config = (0, exports.loadConfig)();
