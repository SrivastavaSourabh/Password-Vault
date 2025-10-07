import { VaultController } from '@/lib/controllers/VaultController';
import { ValidationMiddleware } from '@/lib/middleware/validation';
import { ErrorHandler } from '@/lib/middleware/errorHandler';

export class VaultService {
  // Fetch all vault items for a user
  static async getVaultItems(userId: string) {
    try {
      if (!userId) {
        throw ErrorHandler.createError('User ID is required', 400);
      }

      if (!ValidationMiddleware.validateObjectId(userId)) {
        throw ErrorHandler.createError('Invalid user ID format', 400);
      }

      const result = await VaultController.getVaultItems(userId);
      return result;
    } catch (error) {
      const { message, statusCode } = ErrorHandler.handleError(error);
      throw ErrorHandler.createError(message, statusCode);
    }
  }

  // Create a new vault item
  static async createVaultItem(encryptedData: string, userId: string) {
    try {
      if (!encryptedData || !userId) {
        throw ErrorHandler.createError('Encrypted data and user ID are required', 400);
      }

      if (!ValidationMiddleware.validateEncryptedData(encryptedData)) {
        throw ErrorHandler.createError('Invalid encrypted data format', 400);
      }

      if (!ValidationMiddleware.validateObjectId(userId)) {
        throw ErrorHandler.createError('Invalid user ID format', 400);
      }

      const result = await VaultController.createVaultItem(encryptedData, userId);
      return result;
    } catch (error) {
      const { message, statusCode } = ErrorHandler.handleError(error);
      throw ErrorHandler.createError(message, statusCode);
    }
  }

  // Update an existing vault item
  static async updateVaultItem(id: string, encryptedData: string, userId: string) {
    try {
      if (!id || !encryptedData || !userId) {
        throw ErrorHandler.createError('ID, encrypted data, and user ID are required', 400);
      }

      if (!ValidationMiddleware.validateObjectId(id)) {
        throw ErrorHandler.createError('Invalid ID format', 400);
      }

      if (!ValidationMiddleware.validateEncryptedData(encryptedData)) {
        throw ErrorHandler.createError('Invalid encrypted data format', 400);
      }

      if (!ValidationMiddleware.validateObjectId(userId)) {
        throw ErrorHandler.createError('Invalid user ID format', 400);
      }

      const result = await VaultController.updateVaultItem(id, encryptedData, userId);
      return result;
    } catch (error) {
      const { message, statusCode } = ErrorHandler.handleError(error);
      throw ErrorHandler.createError(message, statusCode);
    }
  }

  // Delete a vault item
  static async deleteVaultItem(id: string, userId: string) {
    try {
      if (!id || !userId) {
        throw ErrorHandler.createError('ID and user ID are required', 400);
      }

      if (!ValidationMiddleware.validateObjectId(id)) {
        throw ErrorHandler.createError('Invalid ID format', 400);
      }

      if (!ValidationMiddleware.validateObjectId(userId)) {
        throw ErrorHandler.createError('Invalid user ID format', 400);
      }

      const result = await VaultController.deleteVaultItem(id, userId);
      return result;
    } catch (error) {
      const { message, statusCode } = ErrorHandler.handleError(error);
      throw ErrorHandler.createError(message, statusCode);
    }
  }

  // Encrypt and save a vault item
  static async encryptAndSaveVaultItem(item: any, userPassword: string, userId: string) {
    try {
      const itemValidation = ValidationMiddleware.validateVaultItem(item);
      if (!itemValidation.isValid) {
        throw ErrorHandler.createError(itemValidation.error!, 400);
      }

      if (!ValidationMiddleware.validateObjectId(userId)) {
        throw ErrorHandler.createError('Invalid user ID format', 400);
      }

      const result = await VaultController.encryptAndSaveVaultItem(item, userPassword, userId);
      return result;
    } catch (error) {
      const { message, statusCode } = ErrorHandler.handleError(error);
      throw ErrorHandler.createError(message, statusCode);
    }
  }
}
