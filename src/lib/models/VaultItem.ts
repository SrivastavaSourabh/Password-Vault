import mongoose, { Schema, Document } from 'mongoose';

export interface IEncryptedVaultItem extends Document {
  encryptedData: string;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const EncryptedVaultItemSchema = new Schema<IEncryptedVaultItem>({
  encryptedData: {
    type: String,
    required: [true, 'Encrypted data is required'],
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
  },
}, {
  timestamps: true,
});

export default mongoose.models.EncryptedVaultItem || mongoose.model<IEncryptedVaultItem>('EncryptedVaultItem', EncryptedVaultItemSchema);
