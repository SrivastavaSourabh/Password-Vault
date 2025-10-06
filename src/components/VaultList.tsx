'use client';

import React, { useState, useEffect } from 'react';
import { VaultItem, EncryptedVaultItem } from '@/types/index';
import { encryptVaultItem, decryptVaultItem } from '@/lib/encryption';
import VaultItemCard from './VaultItemCard';
import VaultItemForm from './VaultItemForm';

interface VaultListProps {
  userId: string;
  userPassword: string;
}

export default function VaultList({ userId, userPassword }: VaultListProps) {
  const [vaultItems, setVaultItems] = useState<VaultItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<VaultItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchVaultItems = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/vault?userId=${userId}`);
      const data = await response.json();

      if (response.ok) {
        // Decrypt vault items
        const decryptedItems = data.vaultItems.map((item: EncryptedVaultItem) => {
          try {
            const decryptedItem = decryptVaultItem(item.encryptedData, userPassword);
            // Preserve the _id from the encrypted item
            return {
              ...decryptedItem,
              _id: item._id
            };
          } catch (error) {
            console.error('Error decrypting item:', error);
            return null;
          }
        }).filter(Boolean);

        setVaultItems(decryptedItems);
      } else {
        console.error('Error fetching vault items:', data.error);
      }
    } catch (error) {
      console.error('Error fetching vault items:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId && userPassword) {
      fetchVaultItems();
    }
  }, [userId, userPassword]);

  const handleSaveItem = async (item: VaultItem) => {
    try {
      console.log('Saving item:', item);
      const encryptedData = encryptVaultItem(item, userPassword);
      
      const url = editingItem ? `/api/vault/${editingItem._id}` : '/api/vault';
      const method = editingItem ? 'PUT' : 'POST';
      
      console.log('API call:', { url, method, userId });
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          encryptedData,
          userId,
        }),
      });

      console.log('Response status:', response.status);

      if (response.ok) {
        console.log('Item saved successfully');
        await fetchVaultItems();
        setShowForm(false);
        setEditingItem(null);
      } else {
        const data = await response.json();
        console.error('Error saving item:', data.error);
        alert(`Error saving item: ${data.error || 'Please try again.'}`);
      }
    } catch (error) {
      console.error('Error saving item:', error);
      alert(`Error saving item: ${error instanceof Error ? error.message : 'Please try again.'}`);
    }
  };

  const handleEditItem = (item: VaultItem) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDeleteItem = async (id: string) => {
    try {
      const response = await fetch(`/api/vault/${id}?userId=${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchVaultItems();
      } else {
        const data = await response.json();
        console.error('Error deleting item:', data.error);
        alert('Error deleting item. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Error deleting item. Please try again.');
    }
  };

  const filteredItems = vaultItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.notes.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-400">Loading vault items...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Password Vault</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-500/25"
        >
          Add New Item
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search vault items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        />
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="max-h-screen overflow-y-auto">
            <VaultItemForm
              item={editingItem || undefined}
              onSubmit={handleSaveItem}
              onCancel={() => {
                setShowForm(false);
                setEditingItem(null);
              }}
            />
          </div>
        </div>
      )}

      {filteredItems.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          {searchTerm ? 'No items match your search.' : 'No vault items yet. Add your first item!'}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <VaultItemCard
              key={item._id}
              item={item}
              onEdit={handleEditItem}
              onDelete={handleDeleteItem}
              userPassword={userPassword}
            />
          ))}
        </div>
      )}
    </div>
  );
}
