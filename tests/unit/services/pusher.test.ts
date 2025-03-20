import { subscribeToDepositNotifications, triggerDepositEvent } from '../../../src/services/pusher';
import PusherJS from 'pusher-js';
import { logInfo, logError } from '../../../src/utils/logger';

jest.mock('pusher-js');
jest.mock('../../../src/utils/logger');

describe('Pusher Service', () => {
  const organizationId = 'org123';
  const token = 'mockToken';
  const callback = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('subscribeToDepositNotifications should subscribe to deposit notifications', async () => {
    await subscribeToDepositNotifications(organizationId, token, callback);

    expect(PusherJS).toHaveBeenCalled();
    expect(logInfo).toHaveBeenCalledWith(`Subscribed to deposit notifications for organization: ${organizationId}`, 'pusher');
  });

  test('triggerDepositEvent should trigger a deposit event', async () => {
    const data = { amount: '100', network: 'Solana', transactionId: 'tx123' };
    await triggerDepositEvent(organizationId, data);

    expect(logInfo).toHaveBeenCalledWith(`Triggered deposit event for organization: ${organizationId}`, 'pusher');
  });
});