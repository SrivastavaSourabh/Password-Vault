export interface VaultItem {
  _id?: string;
  title: string;
  username: string;
  password: string;
  url: string;
  notes: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface User {
  _id?: string;
  email: string;
  password: string;
  createdAt?: Date;
}

export interface PasswordOptions {
  length: number;
  includeNumbers: boolean;
  includeLetters: boolean;
  includeSymbols: boolean;
  excludeLookAlikes: boolean;
}

export interface EncryptedVaultItem {
  _id?: string;
  encryptedData: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
