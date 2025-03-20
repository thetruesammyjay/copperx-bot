// Pusher deposit event data
export interface DepositEventData {
  amount: string;
  network: string;
  transactionId: string;
}

// Pusher subscription response
export interface PusherSubscriptionResponse {
  auth: string;
  channel_data?: string;
}