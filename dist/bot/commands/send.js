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
exports.sendWalletCommand = exports.sendEmailCommand = void 0;
const copperx_1 = require("../../services/copperx");
const validation_1 = require("../../utils/validation");
const logger_1 = require("../../utils/logger");
const encryption_1 = require("../../utils/encryption"); // Add decryption utility
// Command: /send email <email> <amount>
const sendEmailCommand = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!('text' in ctx.message)) {
        return ctx.reply('Please send a text message.');
    }
    const args = ctx.message.text.split(' ');
    if (args.length !== 4) {
        return ctx.reply('Usage: /send email <email> <amount>');
    }
    const [, , email, amount] = args;
    if (!(0, validation_1.validateEmail)(email)) {
        return ctx.reply('Invalid email format.');
    }
    if (!(0, validation_1.validateAmount)(amount)) {
        return ctx.reply('Invalid amount. Please provide a positive number.');
    }
    if (!((_a = ctx.session) === null || _a === void 0 ? void 0 : _a.token)) {
        return ctx.reply('Please log in first using /login.');
    }
    try {
        const token = (0, encryption_1.decrypt)(ctx.session.token); // Decrypt the token
        const response = yield (0, copperx_1.sendFundsToEmail)(token, email, parseFloat(amount));
        ctx.reply(`Funds sent successfully! Transaction ID: ${response.transactionId}`);
        (0, logger_1.logInfo)(`Funds sent to email: ${email}`, 'send');
    }
    catch (error) {
        (0, logger_1.logError)(error, 'sending funds to email');
        ctx.reply('Failed to send funds. Please try again later.');
    }
});
exports.sendEmailCommand = sendEmailCommand;
// Command: /send wallet <address> <amount>
const sendWalletCommand = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!('text' in ctx.message)) {
        return ctx.reply('Please send a text message.');
    }
    const args = ctx.message.text.split(' ');
    if (args.length !== 4) {
        return ctx.reply('Usage: /send wallet <address> <amount>');
    }
    const [, , address, amount] = args;
    if (!(0, validation_1.validateWalletAddress)(address)) {
        return ctx.reply('Invalid wallet address.');
    }
    if (!(0, validation_1.validateAmount)(amount)) {
        return ctx.reply('Invalid amount. Please provide a positive number.');
    }
    if (!((_a = ctx.session) === null || _a === void 0 ? void 0 : _a.token)) {
        return ctx.reply('Please log in first using /login.');
    }
    try {
        const token = (0, encryption_1.decrypt)(ctx.session.token); // Decrypt the token
        const response = yield (0, copperx_1.sendFundsToWallet)(token, address, parseFloat(amount));
        ctx.reply(`Funds sent successfully! Transaction ID: ${response.transactionId}`);
        (0, logger_1.logInfo)(`Funds sent to wallet: ${address}`, 'send');
    }
    catch (error) {
        (0, logger_1.logError)(error, 'sending funds to wallet');
        ctx.reply('Failed to send funds. Please try again later.');
    }
});
exports.sendWalletCommand = sendWalletCommand;
