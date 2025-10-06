'use client';

import { useState } from 'react';
import { PasswordOptions } from '@/types';
import { generatePassword, calculatePasswordStrength, getStrengthLabel, getStrengthColor } from '@/lib/passwordGenerator';
import { copyToClipboard, showCopyNotification } from '@/lib/clipboard';

const defaultOptions: PasswordOptions = {
  length: 12,
  includeNumbers: true,
  includeLetters: true,
  includeSymbols: true,
  excludeLookAlikes: false,
};

export default function PasswordGenerator() {
  const [options, setOptions] = useState<PasswordOptions>(defaultOptions);
  const [generatedPassword, setGeneratedPassword] = useState<string>('');
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleGenerate = () => {
    try {
      const password = generatePassword(options);
      setGeneratedPassword(password);
      setIsCopied(false);
    } catch (error) {
      console.error('Error generating password:', error);
      alert('Error generating password. Please check your options.');
    }
  };

  const handleCopy = async () => {
    if (generatedPassword) {
      const success = await copyToClipboard(generatedPassword);
      if (success) {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } else {
        alert('Failed to copy to clipboard');
      }
    }
  };

  const strength = generatedPassword ? calculatePasswordStrength(generatedPassword) : 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Password Generator</h2>
      
      {/* Password Display */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <input
            type="text"
            value={generatedPassword}
            readOnly
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm font-mono"
            placeholder="Generated password will appear here"
          />
          <button
            onClick={handleCopy}
            disabled={!generatedPassword}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              isCopied
                ? 'bg-green-500 text-white'
                : generatedPassword
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isCopied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        
        {/* Password Strength Indicator */}
        {generatedPassword && (
          <div className="mb-2">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
              <span>Strength:</span>
              <span className="font-medium">{getStrengthLabel(strength)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(strength)}`}
                style={{ width: `${(strength / 5) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Length Slider */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Length: {options.length}
        </label>
        <input
          type="range"
          min="4"
          max="50"
          value={options.length}
          onChange={(e) => setOptions({ ...options, length: parseInt(e.target.value) })}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {/* Character Options */}
      <div className="space-y-3 mb-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={options.includeLetters}
            onChange={(e) => setOptions({ ...options, includeLetters: e.target.checked })}
            className="mr-2"
          />
          <span className="text-sm text-gray-700">Include letters (a-z, A-Z)</span>
        </label>
        
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={options.includeNumbers}
            onChange={(e) => setOptions({ ...options, includeNumbers: e.target.checked })}
            className="mr-2"
          />
          <span className="text-sm text-gray-700">Include numbers (0-9)</span>
        </label>
        
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={options.includeSymbols}
            onChange={(e) => setOptions({ ...options, includeSymbols: e.target.checked })}
            className="mr-2"
          />
          <span className="text-sm text-gray-700">Include symbols (!@#$%^&*)</span>
        </label>
        
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={options.excludeLookAlikes}
            onChange={(e) => setOptions({ ...options, excludeLookAlikes: e.target.checked })}
            className="mr-2"
          />
          <span className="text-sm text-gray-700">Exclude look-alike characters (l, 1, I, O, 0)</span>
        </label>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors font-medium"
      >
        Generate Password
      </button>
    </div>
  );
}
