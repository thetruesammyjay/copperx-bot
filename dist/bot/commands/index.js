"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupCommands = void 0;
const auth_1 = require("./auth");
const balance_1 = require("./balance");
const send_1 = require("./send");
const withdraw_1 = require("./withdraw");
const kyc_1 = require("./kyc");
const help_1 = require("./help");
const setupCommands = (bot) => {
    bot.command('login', auth_1.loginCommand);
    bot.command('auth', auth_1.authCommand);
    bot.command('logout', auth_1.logoutCommand);
    bot.command('balance', balance_1.balanceCommand);
    bot.command('send', (ctx) => {
        var _a;
        const args = (_a = ctx.message) === null || _a === void 0 ? void 0 : _a.text.split(' ');
        if ((args === null || args === void 0 ? void 0 : args[1]) === 'email') {
            (0, send_1.sendEmailCommand)(ctx);
        }
        else if ((args === null || args === void 0 ? void 0 : args[1]) === 'wallet') {
            (0, send_1.sendWalletCommand)(ctx);
        }
        else {
            ctx.reply('Usage: /send email <email> <amount> OR /send wallet <address> <amount>');
        }
    });
    bot.command('withdraw', withdraw_1.withdrawCommand);
    bot.command('kyc', kyc_1.kycCommand);
    bot.command('help', help_1.helpCommand);
};
exports.setupCommands = setupCommands;
