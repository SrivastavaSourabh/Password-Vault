export class ValidationMiddleware {
  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static validatePassword(password: string): { isValid: boolean; error?: string } {
    if (!password) {
      return { isValid: false, error: 'Password is required' };
    }
    
    if (password.length < 6) {
      return { isValid: false, error: 'Password must be at least 6 characters long' };
    }
    
    return { isValid: true };
  }

  static validateVaultItem(item: any): { isValid: boolean; error?: string } {
    if (!item) {
      return { isValid: false, error: 'Vault item is required' };
    }

    if (!item.title || item.title.trim() === '') {
      return { isValid: false, error: 'Title is required' };
    }

    return { isValid: true };
  }

  static validateObjectId(id: string): boolean {
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;
    return objectIdRegex.test(id);
  }

  static sanitizeInput(input: string): string {
    return input.trim();
  }

  static validateEncryptedData(data: string): boolean {
    return typeof data === 'string' && data.length > 0;
  }
}

