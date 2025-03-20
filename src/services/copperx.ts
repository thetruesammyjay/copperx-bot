import axios from 'axios';
import { loadConfig } from '../config';
import { logError, logInfo } from '../utils/logger';

const config = loadConfig();

// Fetch wallet balances
export const getWalletBalances = async (token: string) => {
  try {
    const response = await axios.get(`${config.copperxApiBaseUrl}/wallets/balances`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    logInfo('Fetched wallet balances successfully.', 'copperx');
    return response.data;
  } catch (error) {
    logError(error, 'fetching wallet balances');
    throw new Error('Failed to fetch wallet balances.');
  }
};

// Withdraw funds to a bank account
export const withdrawToBank = async (token: string, bankAccountId: string, amount: number) => {
  try {
    const response = await axios.post(
      `${config.copperxApiBaseUrl}/transfers/offramp`,
      { bankAccountId, amount },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    logInfo(`Withdrawal successful: ${response.data.transactionId}`, 'copperx');
    return response.data;
  } catch (error) {
    logError(error, 'withdrawing funds to bank');
    throw new Error('Failed to process withdrawal.');
  }
};

// Send funds to an email
export const sendFundsToEmail = async (token: string, email: string, amount: number) => {
  try {
    const response = await axios.post(
      `${config.copperxApiBaseUrl}/transfers/send`,
      { email, amount },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    logInfo(`Funds sent to email: ${email}`, 'copperx');
    return response.data;
  } catch (error) {
    logError(error, 'sending funds to email');
    throw new Error('Failed to send funds.');
  }
};

// Send funds to a wallet address
export const sendFundsToWallet = async (token: string, address: string, amount: number) => {
  try {
    const response = await axios.post(
      `${config.copperxApiBaseUrl}/transfers/wallet-withdraw`,
      { address, amount },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    logInfo(`Funds sent to wallet: ${address}`, 'copperx');
    return response.data;
  } catch (error) {
    logError(error, 'sending funds to wallet');
    throw new Error('Failed to send funds.');
  }
};

// Request OTP for authentication
export const requestOTP = async (email: string) => {
  try {
    const response = await axios.post(`${config.copperxApiBaseUrl}/auth/email-otp/request`, { email });
    logInfo(`OTP requested for email: ${email}`, 'copperx');
    return response.data;
  } catch (error) {
    logError(error, 'requesting OTP');
    throw new Error('Failed to request OTP.');
  }
};

// Authenticate with OTP
export const authenticateOTP = async (email: string, otp: string) => {
  try {
    const response = await axios.post(`${config.copperxApiBaseUrl}/auth/email-otp/authenticate`, { email, otp });
    logInfo(`User authenticated: ${email}`, 'copperx');
    return response.data.token; // Session token
  } catch (error) {
    logError(error, 'authenticating OTP');
    throw new Error('Failed to authenticate.');
  }
};