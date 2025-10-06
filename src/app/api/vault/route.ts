import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { VaultController } from '@/lib/controllers/VaultController';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    await connectDB();

    const result = await VaultController.getVaultItems(userId);
    return NextResponse.json(result.data, { status: 200 });
  } catch (error) {
    console.error('Error fetching vault items:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { encryptedData, userId } = await request.json();

    if (!encryptedData || !userId) {
      return NextResponse.json(
        { error: 'Encrypted data and user ID are required' },
        { status: 400 }
      );
    }

    await connectDB();

    const result = await VaultController.createVaultItem(encryptedData, userId);
    return NextResponse.json(result.data, { status: 201 });
  } catch (error) {
    console.error('Error creating vault item:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
