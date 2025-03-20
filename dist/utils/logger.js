"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logMessage = exports.logError = exports.logWarn = exports.logInfo = void 0;
// Base logger function
const log = (level, message, context) => {
    const timestamp = new Date().toISOString();
    const logMessage = context
        ? `[${timestamp}] [${level.toUpperCase()}] [${context}] ${message}`
        : `[${timestamp}] [${level.toUpperCase()}] ${message}`;
    switch (level) {
        case 'info':
            console.log(logMessage);
            break;
        case 'warn':
            console.warn(logMessage);
            break;
        case 'error':
            console.error(logMessage);
            break;
        default:
            console.log(logMessage);
    }
};
// Log informational messages
const logInfo = (message, context) => {
    log('info', message, context);
};
exports.logInfo = logInfo;
// Log warning messages
const logWarn = (message, context) => {
    log('warn', message, context);
};
exports.logWarn = logWarn;
// Log error messages
const logError = (error, context) => {
    const errorMessage = error instanceof Error ? error.message : String(error);
    log('error', errorMessage, context);
    // Optionally log the full error stack for debugging
    if (error instanceof Error && error.stack) {
        log('error', error.stack, context);
    }
};
exports.logError = logError;
// Log messages with context (e.g., user messages)
const logMessage = (message, context) => {
    log('info', message, context);
};
exports.logMessage = logMessage;
