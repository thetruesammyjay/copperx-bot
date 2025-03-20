"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupBot = void 0;
const telegraf_session_local_1 = __importDefault(require("telegraf-session-local"));
const telegraf_ratelimit_1 = __importDefault(require("telegraf-ratelimit")); // Import rate-limiting middleware
const commands_1 = require("./commands");
const mainMenu_1 = require("./menus/mainMenu");
const middlewares_1 = require("./middlewares");
const logger_1 = require("../utils/logger"); // Import logInfo and logError
// Set up the bot
const setupBot = (bot) => {
    // Set up session middleware
    const session = new telegraf_session_local_1.default({ database: 'sessions.json' });
    bot.use(session.middleware());
    // Rate-limiting middleware
    const limitConfig = {
        window: 60 * 60 * 1000, // 1 hour
        limit: 3, // Max 3 requests per hour
        onLimitExceeded: (ctx) => ctx.reply('Rate limit exceeded. Please try again later.'),
    };
    // Apply rate-limiting middleware
    bot.use((0, telegraf_ratelimit_1.default)(limitConfig));
    // Set up middlewares
    (0, middlewares_1.setupMiddlewares)(bot);
    // Set up commands
    (0, commands_1.setupCommands)(bot);
    // Set up menus
    (0, mainMenu_1.setupMainMenu)(bot);
    // Add /status command
    bot.command('status', (ctx) => {
        ctx.reply('Bot is running and healthy!');
    });
    // Error handling
    bot.catch((error, ctx) => {
        (0, logger_1.logError)(error, 'bot error');
        if (ctx) {
            ctx.reply('An unexpected error occurred. Please try again later.');
        }
        else {
            console.error('An unexpected error occurred:', error);
        }
    });
    // Start the bot
    bot.launch();
    (0, logger_1.logInfo)('Bot is running...', 'bot');
    // Graceful shutdown
    process.once('SIGINT', () => {
        (0, logger_1.logInfo)('Bot is shutting down (SIGINT)...', 'bot');
        bot.stop('SIGINT');
        process.exit(0);
    });
    process.once('SIGTERM', () => {
        (0, logger_1.logInfo)('Bot is shutting down (SIGTERM)...', 'bot');
        bot.stop('SIGTERM');
        process.exit(0);
    });
};
exports.setupBot = setupBot;
