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
exports.helpCommand = void 0;
// Command: /help
const helpCommand = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const helpMessage = `
📋 *Available Commands:*
/login <email> - Log in with your email
/auth <otp> - Authenticate with OTP
/balance - Check your wallet balances
/send email <email> <amount> - Send funds to an email
/send wallet <address> <amount> - Send funds to a wallet address
/withdraw <bankAccountId> <amount> - Withdraw funds to a bank account
/kyc - Check your KYC status
/help - Show this help message
  `;
    ctx.reply(helpMessage, { parse_mode: 'Markdown' });
});
exports.helpCommand = helpCommand;
