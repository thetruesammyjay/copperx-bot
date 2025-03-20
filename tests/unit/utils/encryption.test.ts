import { encrypt, decrypt } from '../../../src/utils/encryption';

describe('Encryption Utilities', () => {
  const originalText = 'Hello, World!';
  const encryptedText = encrypt(originalText);

  test('encrypt should return a string', () => {
    expect(typeof encryptedText).toBe('string');
  });

  test('decrypt should return the original text', () => {
    const decryptedText = decrypt(encryptedText);
    expect(decryptedText).toBe(originalText);
  });
});