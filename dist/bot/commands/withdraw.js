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
exports.withdrawCommand = void 0;
const copperx_1 = require("../../services/copperx");
const validation_1 = require("../../utils/validation");
const logger_1 = require("../../utils/logger");
// Command: /withdraw <bankAccountId> <amount>
const withdrawCommand = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    // Ensure the message is a text message
    if (!('text' in ctx.message)) {
        return ctx.reply('Please send a text message.');
    }
    const args = ctx.message.text.split(' ');
    if (args.length !== 3) {
        return ctx.reply('Usage: /withdraw <bankAccountId> <amount>');
    }
    const [, bankAccountId, amount] = args;
    if (!(0, validation_1.validateAmount)(amount)) {
        return ctx.reply('Invalid amount. Please provide a positive number.');
    }
    const token = ctx.session.token;
    if (!token) {
        return ctx.reply('Please log in first using /login.');
    }
    try {
        const response = yield (0, copperx_1.withdrawToBank)(token, bankAccountId, parseFloat(amount));
        ctx.reply(`Withdrawal successful! Transaction ID: ${response.transactionId}`);
        (0, logger_1.logInfo)(`Withdrawal to bank account: ${bankAccountId}`, 'withdraw');
    }
    catch (error) {
        (0, logger_1.logError)(error, 'processing withdrawal');
        ctx.reply('Failed to process withdrawal. Please try again later.');
    }
});
exports.withdrawCommand = withdrawCommand;
