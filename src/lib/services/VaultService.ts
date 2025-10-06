import { VaultController } from '@/lib/controllers/VaultController';
import { ValidationMiddleware } from '@/lib/middleware/validation';
import { ErrorHandler } from '@/lib/middleware/errorHandler';

export class VaultService {
  static async getVaultItems(userId: string) {
    try {
      // Validate input
      if (!userId) {
        throw ErrorHandler.createError('User ID is required', 400);
      }

      if (!ValidationMiddleware.validateObjectId(userId)) {
        throw ErrorHandler.createError('Invalid user ID format', 400);
      }

      // Call controller
      const result = await VaultController.getVaultItems(userId);
      return result;
    } catch (error) {
      const { message, statusCode } = ErrorHandler.handleError(error);
      throw ErrorHandler.createError(message, statusCode);
    }
  }

  static async createVaultItem(encryptedData: string, userId: string) {
    try {
      // Validate input
      if (!encryptedData || !userId) {
        throw ErrorHandler.createError('Encrypted data and user ID are required', 400);
      }

      if (!ValidationMiddleware.validateEncryptedData(encryptedData)) {
        throw ErrorHandler.createError('Invalid encrypted data format', 400);
      }

      if (!ValidationMiddleware.validateObjectId(userId)) {
        throw ErrorHandler.createError('Invalid user ID format', 400);
      }

      // Call controller
      const result = await VaultController.createVaultItem(encryptedData, userId);
      return result;
    } catch (error) {
      const { message, statusCode } = ErrorHandler.handleError(error);
      throw ErrorHandler.createError(message, statusCode);
    }
  }

  static async updateVaultItem(id: string, encryptedData: string) {
    try {
      // Validate input
      if (!id || !encryptedData) {
        throw ErrorHandler.createError('ID and encrypted data are required', 400);
      }

      if (!ValidationMiddleware.validateObjectId(id)) {
        throw ErrorHandler.createError('Invalid ID format', 400);
      }

      if (!ValidationMiddleware.validateEncryptedData(encryptedData)) {
        throw ErrorHandler.createError('Invalid encrypted data format', 400);
      }

      // Call controller
      const result = await VaultController.updateVaultItem(id, encryptedData);
      return result;
    } catch (error) {
      const { message, statusCode } = ErrorHandler.handleError(error);
      throw ErrorHandler.createError(message, statusCode);
    }
  }

  static async deleteVaultItem(id: string) {
    try {
      // Validate input
      if (!id) {
        throw ErrorHandler.createError('ID is required', 400);
      }

      if (!ValidationMiddleware.validateObjectId(id)) {
        throw ErrorHandler.createError('Invalid ID format', 400);
      }

      // Call controller
      const result = await VaultController.deleteVaultItem(id);
      return result;
    } catch (error) {
      const { message, statusCode } = ErrorHandler.handleError(error);
      throw ErrorHandler.createError(message, statusCode);
    }
  }

  static async encryptAndSaveVaultItem(item: any, userPassword: string, userId: string) {
    try {
      // Validate vault item
      const itemValidation = ValidationMiddleware.validateVaultItem(item);
      if (!itemValidation.isValid) {
        throw ErrorHandler.createError(itemValidation.error!, 400);
      }

      // Validate user ID
      if (!ValidationMiddleware.validateObjectId(userId)) {
        throw ErrorHandler.createError('Invalid user ID format', 400);
      }

      // Call controller
      const result = await VaultController.encryptAndSaveVaultItem(item, userPassword, userId);
      return result;
    } catch (error) {
      const { message, statusCode } = ErrorHandler.handleError(error);
      throw ErrorHandler.createError(message, statusCode);
    }
  }
}

