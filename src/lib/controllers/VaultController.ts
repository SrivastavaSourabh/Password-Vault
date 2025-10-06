import { encryptVaultItem, decryptVaultItem } from '@/lib/encryption';
import EncryptedVaultItem from '@/lib/models/VaultItem';
import { VaultItem } from '@/types/index';
import mongoose from 'mongoose';

export class VaultController {
  static async getVaultItems(userId: string) {
    try {
      if (!userId) {
        throw new Error('User ID is required');
      }

      const vaultItems = await EncryptedVaultItem.find({ 
        userId: new mongoose.Types.ObjectId(userId) 
      }).sort({ createdAt: -1 });

      return {
        success: true,
        data: { vaultItems }
      };
    } catch (error) {
      console.error('Error fetching vault items:', error);
      throw error;
    }
  }

  static async createVaultItem(encryptedData: string, userId: string) {
    try {
      if (!encryptedData || !userId) {
        throw new Error('Encrypted data and user ID are required');
      }

      const vaultItem = new EncryptedVaultItem({
        encryptedData,
        userId: new mongoose.Types.ObjectId(userId),
      });

      await vaultItem.save();

      return {
        success: true,
        message: 'Vault item created successfully',
        data: { 
          vaultItem: {
            _id: vaultItem._id?.toString(),
            encryptedData: vaultItem.encryptedData,
            userId: vaultItem.userId?.toString(),
            createdAt: vaultItem.createdAt,
            updatedAt: vaultItem.updatedAt
          }
        }
      };
    } catch (error) {
      console.error('Error creating vault item:', error);
      throw error;
    }
  }

  static async updateVaultItem(id: string, encryptedData: string, userId: string) {
    try {
      if (!id || !encryptedData || !userId) {
        throw new Error('ID, encrypted data, and user ID are required');
      }

      const vaultItem = await EncryptedVaultItem.findOneAndUpdate(
        { 
          _id: new mongoose.Types.ObjectId(id),
          userId: new mongoose.Types.ObjectId(userId)
        },
        { encryptedData },
        { new: true }
      );

      if (!vaultItem) {
        throw new Error('Vault item not found');
      }

      return {
        success: true,
        message: 'Vault item updated successfully',
        data: { 
          vaultItem: {
            _id: vaultItem._id?.toString(),
            encryptedData: vaultItem.encryptedData,
            userId: vaultItem.userId?.toString(),
            createdAt: vaultItem.createdAt,
            updatedAt: vaultItem.updatedAt
          }
        }
      };
    } catch (error) {
      console.error('Error updating vault item:', error);
      throw error;
    }
  }

  static async deleteVaultItem(id: string, userId: string) {
    try {
      if (!id || !userId) {
        throw new Error('ID and user ID are required');
      }

      const vaultItem = await EncryptedVaultItem.findOneAndDelete({
        _id: new mongoose.Types.ObjectId(id),
        userId: new mongoose.Types.ObjectId(userId)
      });

      if (!vaultItem) {
        throw new Error('Vault item not found');
      }

      return {
        success: true,
        message: 'Vault item deleted successfully',
        data: {
          message: 'Vault item deleted successfully'
        }
      };
    } catch (error) {
      console.error('Error deleting vault item:', error);
      throw error;
    }
  }

  // Helper method to encrypt and save vault item
  static async encryptAndSaveVaultItem(item: VaultItem, userPassword: string, userId: string) {
    try {
      const encryptedData = encryptVaultItem(item, userPassword);
      return await this.createVaultItem(encryptedData, userId);
    } catch (error) {
      throw new Error(`Failed to encrypt and save vault item: ${error}`);
    }
  }

  // Helper method to decrypt vault items
  static async decryptVaultItems(encryptedItems: any[], userPassword: string): Promise<VaultItem[]> {
    try {
      return encryptedItems.map((item: any) => {
        try {
          return decryptVaultItem(item.encryptedData, userPassword);
        } catch (error) {
          console.error('Error decrypting item:', error);
          return null;
        }
      }).filter(Boolean);
    } catch (error) {
      throw new Error(`Failed to decrypt vault items: ${error}`);
    }
  }
}
