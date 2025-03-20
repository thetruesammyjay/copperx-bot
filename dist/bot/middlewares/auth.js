"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.guestMiddleware = exports.authMiddleware = void 0;
// Middleware to check if user is authenticated
const authMiddleware = (ctx, next) => {
    if (!ctx.session || !ctx.session.token || !ctx.session.expiresAt || ctx.session.expiresAt < Date.now()) {
        return ctx.reply('Please log in first using /login.');
    }
    return next();
};
exports.authMiddleware = authMiddleware;
// Middleware to check if user is not authenticated
const guestMiddleware = (ctx, next) => {
    if (ctx.session && ctx.session.token && ctx.session.expiresAt && ctx.session.expiresAt > Date.now()) {
        return ctx.reply('You are already logged in.');
    }
    return next();
};
exports.guestMiddleware = guestMiddleware;
