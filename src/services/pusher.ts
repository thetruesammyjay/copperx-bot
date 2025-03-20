import Pusher from 'pusher';
import PusherJS from 'pusher-js';
import { loadConfig } from '../config';
import { logInfo, logError } from '../utils/logger';

const config = loadConfig();

// Initialize Pusher for server-side operations
const pusher = new Pusher({
  appId: '1959620', // Replace with your Pusher app ID
  key: config.pusherKey, // From .env
  secret: 'c1dee1cc199ee1d46444', // Replace with your Pusher secret
  cluster: config.pusherCluster, // From .env
  useTLS: true,
});

// Initialize Pusher for client-side subscriptions
const pusherClient = new PusherJS(config.pusherKey, {
  cluster: config.pusherCluster,
  forceTLS: true,
});

// Subscribe to organization's private channel
export const subscribeToDepositNotifications = (organizationId: string, token: string, callback: (data: any) => void) => {
  try {
    const channel = pusherClient.subscribe(`private-org-${organizationId}`);
    channel.bind('deposit', callback);
    logInfo(`Subscribed to deposit notifications for organization: ${organizationId}`, 'pusher');
  } catch (error) {
    logError(error, 'subscribing to deposit notifications');
    throw new Error('Failed to subscribe to deposit notifications.');
  }
};

// Trigger an event (server-side)
export const triggerDepositEvent = (organizationId: string, data: any) => {
  try {
    pusher.trigger(`private-org-${organizationId}`, 'deposit', data);
    logInfo(`Triggered deposit event for organization: ${organizationId}`, 'pusher');
  } catch (error) {
    logError(error, 'triggering deposit event');
    throw new Error('Failed to trigger deposit event.');
  }
};