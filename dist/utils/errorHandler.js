"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const logger_1 = require("./logger");
// Handle errors and send user-friendly messages
const handleError = (ctx, error) => {
    var _a, _b;
    (0, logger_1.logError)(error, 'errorHandler');
    if ((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) {
        ctx.reply(`Error: ${error.response.data.message}`);
    }
    else {
        ctx.reply('An unexpected error occurred. Please try again later.');
    }
};
exports.handleError = handleError;
