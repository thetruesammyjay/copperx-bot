// Response for /api/auth/email-otp/request
export interface RequestOTPResponse {
  success: boolean;
  message: string;
}

// Response for /api/auth/email-otp/authenticate
export interface AuthenticateOTPResponse {
  token: string;
}

// Response for /api/wallets/balances
export interface WalletBalance {
  network: string;
  balance: string;
}

export interface WalletBalancesResponse {
  wallets: WalletBalance[];
}

// Response for /api/transfers/send
export interface TransferResponse {
  transactionId: string;
  amount: string;
  recipient: string;
}

// Response for /api/transfers/offramp (withdrawal)
export interface WithdrawalResponse {
  transactionId: string;
  amount: string;
  bankAccountId: string;
}