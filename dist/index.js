"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const bot_1 = require("./bot/bot"); // Import the setupBot function
const config_1 = require("./config");
const express_1 = __importDefault(require("express"));
const logger_1 = require("./utils/logger"); // Import logInfo
// Load environment variables
const config = (0, config_1.loadConfig)();
// Initialize the bot
const bot = new telegraf_1.Telegraf(config.telegramBotToken);
// Set up the bot
(0, bot_1.setupBot)(bot);
// Health check endpoint
const app = (0, express_1.default)();
app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
});
// Start the health check server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    (0, logger_1.logInfo)(`Health check server running on port ${PORT}`, 'health');
    console.log(`Health check server running on port ${PORT}`);
});
