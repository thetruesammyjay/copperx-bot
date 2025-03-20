import axios from 'axios';
import { getWalletBalances, withdrawToBank, sendFundsToEmail, sendFundsToWallet, requestOTP, authenticateOTP } from '../../../src/services/copperx';
import { logInfo, logError } from '../../../src/utils/logger';

jest.mock('axios');
jest.mock('../../../src/utils/logger');

describe('Copperx Service', () => {
  const token = 'mockToken';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getWalletBalances should fetch wallet balances', async () => {
    const mockBalances = [{ currency: 'USDC', amount: '100', network: 'Solana' }];
    (axios.get as jest.Mock).mockResolvedValue({ data: mockBalances });

    const result = await getWalletBalances(token);

    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/wallets/balances'), {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(result).toEqual(mockBalances);
    expect(logInfo).toHaveBeenCalledWith('Fetched wallet balances successfully.', 'copperx');
  });

  test('withdrawToBank should process a withdrawal', async () => {
    const mockResponse = { transactionId: 'tx123' };
    (axios.post as jest.Mock).mockResolvedValue({ data: mockResponse });

    const result = await withdrawToBank(token, '123456789', 100);

    expect(axios.post).toHaveBeenCalledWith(expect.stringContaining('/transfers/offramp'), {
      bankAccountId: '123456789',
      amount: 100,
    }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(result).toEqual(mockResponse);
    expect(logInfo).toHaveBeenCalledWith('Withdrawal successful: tx123', 'copperx');
  });

  test('sendFundsToEmail should send funds to an email', async () => {
    const mockResponse = { transactionId: 'tx123' };
    (axios.post as jest.Mock).mockResolvedValue({ data: mockResponse });

    const result = await sendFundsToEmail(token, 'test@example.com', 100);

    expect(axios.post).toHaveBeenCalledWith(expect.stringContaining('/transfers/send'), {
      email: 'test@example.com',
      amount: 100,
    }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(result).toEqual(mockResponse);
    expect(logInfo).toHaveBeenCalledWith('Funds sent to email: test@example.com', 'copperx');
  });

  test('sendFundsToWallet should send funds to a wallet address', async () => {
    const mockResponse = { transactionId: 'tx123' };
    (axios.post as jest.Mock).mockResolvedValue({ data: mockResponse });

    const result = await sendFundsToWallet(token, '0x1234567890abcdef', 100);

    expect(axios.post).toHaveBeenCalledWith(expect.stringContaining('/transfers/wallet-withdraw'), {
      address: '0x1234567890abcdef',
      amount: 100,
    }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(result).toEqual(mockResponse);
    expect(logInfo).toHaveBeenCalledWith('Funds sent to wallet: 0x1234567890abcdef', 'copperx');
  });

  test('requestOTP should request an OTP', async () => {
    const mockResponse = { success: true };
    (axios.post as jest.Mock).mockResolvedValue({ data: mockResponse });

    const result = await requestOTP('test@example.com');

    expect(axios.post).toHaveBeenCalledWith(expect.stringContaining('/auth/email-otp/request'), {
      email: 'test@example.com',
    });
    expect(result).toEqual(mockResponse);
    expect(logInfo).toHaveBeenCalledWith('OTP requested for email: test@example.com', 'copperx');
  });

  test('authenticateOTP should authenticate with OTP', async () => {
    const mockResponse = { token: 'mockToken' };
    (axios.post as jest.Mock).mockResolvedValue({ data: mockResponse });

    const result = await authenticateOTP('test@example.com', '123456');

    expect(axios.post).toHaveBeenCalledWith(expect.stringContaining('/auth/email-otp/authenticate'), {
      email: 'test@example.com',
      otp: '123456',
    });
    expect(result).toEqual('mockToken');
    expect(logInfo).toHaveBeenCalledWith('User authenticated: test@example.com', 'copperx');
  });
});