'use client';

import React, { useState } from 'react';
import { VaultItem } from '@/types/index';
import { copyToClipboard } from '@/lib/clipboard';

interface VaultItemCardProps {
  item: VaultItem;
  onEdit: (item: VaultItem) => void;
  onDelete: (id: string) => void;
  userPassword: string;
}

export default function VaultItemCard({ item, onEdit, onDelete, userPassword }: VaultItemCardProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = async (text: string, field: string) => {
    if (typeof window !== 'undefined') {
      const success = await copyToClipboard(text);
      if (success) {
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
      }
    }
  };

  const handleDelete = () => {
    if (typeof window !== 'undefined' && window.confirm('Are you sure you want to delete this item?')) {
      console.log('Delete item with ID:', item._id);
      if (item._id) {
        onDelete(item._id);
      } else {
        console.error('Item ID is undefined, cannot delete');
        alert('Error: Item ID is missing. Cannot delete this item.');
      }
    }
  };

  return (
    <div className="bg-dark-800/50 backdrop-blur-sm rounded-lg shadow-xl p-4 border border-dark-700 hover:border-dark-600 transition-colors">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-white">{item.title}</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(item)}
            className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="text-red-400 hover:text-red-300 text-sm transition-colors"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {item.username && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Username:</span>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-mono text-gray-200">{item.username}</span>
              <button
                onClick={() => handleCopy(item.username, 'username')}
                className="text-blue-400 hover:text-blue-300 text-xs transition-colors"
              >
                {copiedField === 'username' ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        )}

        {item.password && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Password:</span>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-mono text-gray-200">
                {showPassword ? item.password : '••••••••'}
              </span>
              <div className="flex space-x-1">
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-300 text-xs transition-colors"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
                <button
                  onClick={() => handleCopy(item.password, 'password')}
                  className="text-blue-400 hover:text-blue-300 text-xs transition-colors"
                >
                  {copiedField === 'password' ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          </div>
        )}

        {item.url && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">URL:</span>
            <div className="flex items-center space-x-2">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 text-sm truncate max-w-32 transition-colors"
              >
                {item.url}
              </a>
              <button
                onClick={() => handleCopy(item.url, 'url')}
                className="text-blue-400 hover:text-blue-300 text-xs transition-colors"
              >
                {copiedField === 'url' ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        )}

        {item.notes && (
          <div>
            <span className="text-sm text-gray-400">Notes:</span>
            <p className="text-sm text-gray-200 mt-1">{item.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
}
