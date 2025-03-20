"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.triggerDepositEvent = exports.subscribeToDepositNotifications = void 0;
const pusher_1 = __importDefault(require("pusher"));
const pusher_js_1 = __importDefault(require("pusher-js"));
const config_1 = require("../config");
const logger_1 = require("../utils/logger");
const config = (0, config_1.loadConfig)();
// Initialize Pusher for server-side operations
const pusher = new pusher_1.default({
    appId: '1959620', // Replace with your Pusher app ID
    key: config.pusherKey, // From .env
    secret: 'c1dee1cc199ee1d46444', // Replace with your Pusher secret
    cluster: config.pusherCluster, // From .env
    useTLS: true,
});
// Initialize Pusher for client-side subscriptions
const pusherClient = new pusher_js_1.default(config.pusherKey, {
    cluster: config.pusherCluster,
    forceTLS: true,
});
// Subscribe to organization's private channel
const subscribeToDepositNotifications = (organizationId, token, callback) => {
    try {
        const channel = pusherClient.subscribe(`private-org-${organizationId}`);
        channel.bind('deposit', callback);
        (0, logger_1.logInfo)(`Subscribed to deposit notifications for organization: ${organizationId}`, 'pusher');
    }
    catch (error) {
        (0, logger_1.logError)(error, 'subscribing to deposit notifications');
        throw new Error('Failed to subscribe to deposit notifications.');
    }
};
exports.subscribeToDepositNotifications = subscribeToDepositNotifications;
// Trigger an event (server-side)
const triggerDepositEvent = (organizationId, data) => {
    try {
        pusher.trigger(`private-org-${organizationId}`, 'deposit', data);
        (0, logger_1.logInfo)(`Triggered deposit event for organization: ${organizationId}`, 'pusher');
    }
    catch (error) {
        (0, logger_1.logError)(error, 'triggering deposit event');
        throw new Error('Failed to trigger deposit event.');
    }
};
exports.triggerDepositEvent = triggerDepositEvent;
