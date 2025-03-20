// Validate email format
export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Validate wallet address format (basic example for Ethereum)
export const validateWalletAddress = (address: string): boolean => {
  const regex = /^0x[a-fA-F0-9]{40}$/;
  return regex.test(address);
};

// Validate amount (must be a positive number)
export const validateAmount = (amount: string): boolean => {
  const parsedAmount = parseFloat(amount);
  return !isNaN(parsedAmount) && parsedAmount > 0;
};

// Validate phone number (basic example)
export const validatePhoneNumber = (phone: string): boolean => {
  const regex = /^\+\d{1,3}\d{9,14}$/; // Example: +1234567890
  return regex.test(phone);
};

// Validate bank account ID (basic example)
export const validateBankAccountId = (accountId: string): boolean => {
  const regex = /^[A-Z0-9]{10,20}$/; // Example: ABC123456789
  return regex.test(accountId);
};