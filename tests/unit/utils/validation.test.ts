import { validateEmail, validateWalletAddress, validateAmount } from '../../../src/utils/validation';

describe('Validation Utilities', () => {
  test('validateEmail should validate email format', () => {
    expect(validateEmail('test@example.com')).toBe(true);
    expect(validateEmail('invalid-email')).toBe(false);
  });

  test('validateWalletAddress should validate wallet address format', () => {
    expect(validateWalletAddress('0x1234567890abcdef')).toBe(true);
    expect(validateWalletAddress('invalid-address')).toBe(false);
  });

  test('validateAmount should validate amount format', () => {
    expect(validateAmount('100')).toBe(true);
    expect(validateAmount('-100')).toBe(false);
    expect(validateAmount('invalid-amount')).toBe(false);
  });
});