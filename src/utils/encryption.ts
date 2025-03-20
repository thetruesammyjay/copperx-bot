import CryptoJS from 'crypto-js';
import { config } from '../config';

// Encrypt data
export const encrypt = (data: string): string => {
  return CryptoJS.AES.encrypt(data, config.encryptionKey).toString();
};

// Decrypt data
export const decrypt = (encryptedData: string): string => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, config.encryptionKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};