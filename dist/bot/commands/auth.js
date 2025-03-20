"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutCommand = exports.authCommand = exports.loginCommand = void 0;
const copperx_1 = require("../../services/copperx");
const logger_1 = require("../../utils/logger");
const encryption_1 = require("../../utils/encryption"); // Add encryption utility
// Validate email format
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
// Validate OTP format (6 digits)
const isValidOTP = (otp) => {
    const otpRegex = /^\d{6}$/;
    return otpRegex.test(otp);
};
// Command: /login <email>
const loginCommand = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    if (!('text' in ctx.message)) {
        return ctx.reply('Please send a text message.');
    }
    const email = ctx.message.text.split(' ')[1];
    if (!email) {
        return ctx.reply('Please provide your email. Usage: /login <email>');
    }
    if (!isValidEmail(email)) {
        return ctx.reply('Invalid email format. Please provide a valid email address.');
    }
    try {
        if (!ctx.session) {
            ctx.session = { email: undefined, token: undefined, expiresAt: undefined };
        }
        yield (0, copperx_1.requestOTP)(email);
        ctx.session.email = email;
        ctx.session.expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours from now
        (0, logger_1.logInfo)(`OTP sent to ${email}`, 'authentication');
        ctx.reply(`OTP sent to ${email}. Please check your email and use /auth <otp> to authenticate.`);
    }
    catch (error) {
        (0, logger_1.logError)(error, 'sending OTP');
        ctx.reply('Failed to send OTP. Please try again later.');
    }
});
exports.loginCommand = loginCommand;
// Command: /auth <otp>
const authCommand = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!('text' in ctx.message)) {
        return ctx.reply('Please send a text message.');
    }
    const otp = ctx.message.text.split(' ')[1];
    if (!otp) {
        return ctx.reply('Please provide the OTP. Usage: /auth <otp>');
    }
    if (!isValidOTP(otp)) {
        return ctx.reply('Invalid OTP format. Please provide a 6-digit OTP.');
    }
    if (!((_a = ctx.session) === null || _a === void 0 ? void 0 : _a.email) || !ctx.session.expiresAt || ctx.session.expiresAt < Date.now()) {
        return ctx.reply('Session expired. Please start the login process again with /login <email>.');
    }
    try {
        const token = yield (0, copperx_1.authenticateOTP)(ctx.session.email, otp);
        ctx.session.token = (0, encryption_1.encrypt)(token); // Encrypt the token
        (0, logger_1.logInfo)(`User authenticated successfully: ${ctx.session.email}`, 'authentication');
        ctx.reply('Authentication successful! You can now use other commands.');
    }
    catch (error) {
        (0, logger_1.logError)(error, 'authentication');
        ctx.reply('Invalid OTP or authentication failed. Please try again.');
    }
});
exports.authCommand = authCommand;
// Command: /logout
const logoutCommand = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.session = { email: undefined, token: undefined, expiresAt: undefined };
    (0, logger_1.logInfo)('User logged out successfully.', 'authentication');
    ctx.reply('Logged out successfully.');
});
exports.logoutCommand = logoutCommand;
