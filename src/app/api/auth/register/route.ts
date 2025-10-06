import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { AuthController } from '@/lib/controllers/AuthController';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    await connectDB();

    const result = await AuthController.register(email, password);
    
    return NextResponse.json(
      {
        message: result.message,
        userId: result.data.userId,
        email: result.data.email
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
