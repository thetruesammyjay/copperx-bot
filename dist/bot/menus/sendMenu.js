"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSendMenu = exports.sendMenu = void 0;
const telegraf_1 = require("telegraf");
const mainMenu_1 = require("./mainMenu"); // Import the mainMenu
// Send menu with inline buttons
exports.sendMenu = telegraf_1.Markup.inlineKeyboard([
    telegraf_1.Markup.button.callback('Send to Email', 'send_email'),
    telegraf_1.Markup.button.callback('Send to Wallet', 'send_wallet'),
    telegraf_1.Markup.button.callback('Back to Main Menu', 'back_to_main'),
]);
// Setup send menu
const setupSendMenu = (bot) => {
    bot.hears('📤 Send', (ctx) => {
        ctx.reply('Choose recipient type:', exports.sendMenu);
    });
    bot.action('send_email', (ctx) => {
        ctx.reply('Please use the command: /send email <email> <amount>');
    });
    bot.action('send_wallet', (ctx) => {
        ctx.reply('Please use the command: /send wallet <address> <amount>');
    });
    bot.action('back_to_main', (ctx) => {
        ctx.reply('Returning to the main menu.', mainMenu_1.mainMenu);
    });
};
exports.setupSendMenu = setupSendMenu;
