// Simple test script to verify the application works
const { generatePassword, calculatePasswordStrength } = require('./src/lib/passwordGenerator');

console.log('Testing Password Generator...');

// Test password generation
const options = {
  length: 12,
  includeNumbers: true,
  includeLetters: true,
  includeSymbols: true,
  excludeLookAlikes: false,
};

try {
  const password = generatePassword(options);
  console.log('Generated password:', password);
  
  const strength = calculatePasswordStrength(password);
  console.log('Password strength:', strength);
  
  console.log('✅ Password generator test passed!');
} catch (error) {
  console.error('❌ Password generator test failed:', error.message);
}

console.log('\nTesting encryption...');

const CryptoJS = require('crypto-js');

// Test encryption
const testData = { title: 'Test', username: 'test@example.com', password: 'test123' };
const userPassword = 'userpassword123';
const secretKey = 'password-vault-secret-key-2024';

const key = CryptoJS.PBKDF2(userPassword, secretKey, {
  keySize: 256 / 32,
  iterations: 1000
});

const encrypted = CryptoJS.AES.encrypt(JSON.stringify(testData), key, {
  mode: CryptoJS.mode.CBC,
  padding: CryptoJS.pad.Pkcs7
});

console.log('Encrypted data:', encrypted.toString());

const decrypted = CryptoJS.AES.decrypt(encrypted.toString(), key, {
  mode: CryptoJS.mode.CBC,
  padding: CryptoJS.pad.Pkcs7
});

const decryptedData = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
console.log('Decrypted data:', decryptedData);

if (JSON.stringify(testData) === JSON.stringify(decryptedData)) {
  console.log('✅ Encryption test passed!');
} else {
  console.log('❌ Encryption test failed!');
}

console.log('\n🎉 All tests completed!');
