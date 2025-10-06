import { PasswordOptions } from '@/types';

const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';
const LOOKALIKES = 'l1I|o0O';

export function generatePassword(options: PasswordOptions): string {
  let charset = '';
  
  if (options.includeLetters) {
    charset += LOWERCASE + UPPERCASE;
  }
  
  if (options.includeNumbers) {
    charset += NUMBERS;
  }
  
  if (options.includeSymbols) {
    charset += SYMBOLS;
  }
  
  if (options.excludeLookAlikes) {
    // Remove look-alike characters
    for (const char of LOOKALIKES) {
      charset = charset.replace(new RegExp(char, 'g'), '');
    }
  }
  
  if (charset.length === 0) {
    throw new Error('At least one character type must be selected');
  }
  
  let password = '';
  for (let i = 0; i < options.length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  
  return password;
}

export function calculatePasswordStrength(password: string): number {
  let score = 0;
  
  // Length score
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;
  
  // Character variety
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^a-zA-Z0-9]/.test(password)) score += 1;
  
  return Math.min(score, 5);
}

export function getStrengthLabel(strength: number): string {
  const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
  return labels[strength] || 'Very Weak';
}

export function getStrengthColor(strength: number): string {
  const colors = [
    'bg-red-500',
    'bg-orange-500', 
    'bg-yellow-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-green-600'
  ];
  return colors[strength] || 'bg-red-500';
}
