import { encryptVaultItem, decryptVaultItem } from '@/lib/encryption';
import EncryptedVaultItem from '@/lib/models/VaultItem';
import { VaultItem } from '@/types/index';
import mongoose from 'mongoose';

export class VaultController {
  static async getVaultItems(userId: string) {
    if (!userId) throw new Error('User ID is required');

    const vaultItems = await EncryptedVaultItem.find({
      userId: new mongoose.Types.ObjectId(userId),
    }).sort({ createdAt: -1 });

    return { success: true, data: { vaultItems } };
  }

  static async createVaultItem(encryptedData: string, userId: string) {
    if (!encryptedData || !userId)
      throw new Error('Encrypted data and user ID are required');

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
          updatedAt: vaultItem.updatedAt,
        },
      },
    };
  }

  static async updateVaultItem(id: string, encryptedData: string, userId: string) {
    if (!id || !encryptedData || !userId)
      throw new Error('ID, encrypted data, and user ID are required');

    const vaultItem = await EncryptedVaultItem.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(id),
        userId: new mongoose.Types.ObjectId(userId),
      },
      { encryptedData },
      { new: true }
    );

    if (!vaultItem) throw new Error('Vault item not found');

    return {
      success: true,
      message: 'Vault item updated successfully',
      data: {
        vaultItem: {
          _id: vaultItem._id?.toString(),
          encryptedData: vaultItem.encryptedData,
          userId: vaultItem.userId?.toString(),
          createdAt: vaultItem.createdAt,
          updatedAt: vaultItem.updatedAt,
        },
      },
    };
  }

  static async deleteVaultItem(id: string, userId: string) {
    if (!id || !userId) throw new Error('ID and user ID are required');

    const vaultItem = await EncryptedVaultItem.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(id),
      userId: new mongoose.Types.ObjectId(userId),
    });

    if (!vaultItem) throw new Error('Vault item not found');

    return {
      success: true,
      message: 'Vault item deleted successfully',
      data: { message: 'Vault item deleted successfully' },
    };
  }

  static async encryptAndSaveVaultItem(
    item: VaultItem,
    userPassword: string,
    userId: string
  ) {
    const encryptedData = encryptVaultItem(item, userPassword);
    return await this.createVaultItem(encryptedData, userId);
  }

  // ✅ Fully fixed: returns VaultItem[] with no nulls
  static async decryptVaultItems(
    encryptedItems: any[],
    userPassword: string
  ): Promise<VaultItem[]> {
    const decryptedItems: VaultItem[] = [];

    for (const item of encryptedItems) {
      try {
        const decrypted = decryptVaultItem(item.encryptedData, userPassword);
        decryptedItems.push(decrypted); // only push successful decryptions
      } catch (error) {
        console.warn('Failed to decrypt vault item, skipping:', item, error);
      }
    }

    return decryptedItems; // guaranteed VaultItem[]
  }
}
