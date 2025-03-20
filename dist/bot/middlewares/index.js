"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupMiddlewares = void 0;
const auth_1 = require("./auth");
// Register all middlewares with the bot
const setupMiddlewares = (bot) => {
    // Apply guest middleware to /login and /auth
    bot.command('login', auth_1.guestMiddleware);
    bot.command('auth', auth_1.guestMiddleware);
    // Apply auth middleware to all other commands
    bot.use(auth_1.authMiddleware);
};
exports.setupMiddlewares = setupMiddlewares;
