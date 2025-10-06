import CryptoJS from 'crypto-js';
import { VaultItem } from '@/types/index';

// Helper functions
function getRandomWordArray(len = 16) {
  return CryptoJS.lib.WordArray.random(len);
}

export function encryptVaultItem(item: VaultItem, userPassword: string): string {
  const data = JSON.stringify(item);
  const salt = getRandomWordArray(16); // 16 bytes = 128 bits
  const iv = getRandomWordArray(16);
  const key = CryptoJS.PBKDF2(userPassword, salt, {
    keySize: 256 / 32,
    iterations: 1000,
    hasher: CryptoJS.algo.SHA256,
  });
  
  const encrypted = CryptoJS.AES.encrypt(data, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  
  // Return base64: salt + iv + ciphertext
  const result = {
    ct: encrypted.ciphertext.toString(CryptoJS.enc.Base64),
    iv: iv.toString(CryptoJS.enc.Hex),
    s: salt.toString(CryptoJS.enc.Hex)
  };
  return JSON.stringify(result);
}

export function decryptVaultItem(encryptedData: string, userPassword: string): VaultItem {
  const json = JSON.parse(encryptedData);
  const salt = CryptoJS.enc.Hex.parse(json.s);
  const iv = CryptoJS.enc.Hex.parse(json.iv);
  const key = CryptoJS.PBKDF2(userPassword, salt, {
    keySize: 256 / 32,
    iterations: 1000,
    hasher: CryptoJS.algo.SHA256,
  });

  const cipherParams = CryptoJS.lib.CipherParams.create({
    ciphertext: CryptoJS.enc.Base64.parse(json.ct)
  });
  const decrypted = CryptoJS.AES.decrypt(cipherParams, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });

  const decryptedString = decrypted.toString(CryptoJS.enc.Utf8);
  if (!decryptedString) {
    throw new Error('Failed to decrypt data');
  }
  return JSON.parse(decryptedString);
}
