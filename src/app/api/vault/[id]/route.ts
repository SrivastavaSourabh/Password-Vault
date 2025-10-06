import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { VaultController } from '@/lib/controllers/VaultController';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { encryptedData, userId } = await request.json();
    const { id } = await params;

    if (!encryptedData || !userId) {
      return NextResponse.json(
        { error: 'Encrypted data and user ID are required' },
        { status: 400 }
      );
    }

    await connectDB();

    const result = await VaultController.updateVaultItem(id, encryptedData, userId);
    return NextResponse.json(result.data, { status: 200 });
  } catch (error) {
    console.error('Error updating vault item:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const { id } = await params;

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    await connectDB();

    const result = await VaultController.deleteVaultItem(id, userId);
    return NextResponse.json(result.data, { status: 200 });
  } catch (error) {
    console.error('Error deleting vault item:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
