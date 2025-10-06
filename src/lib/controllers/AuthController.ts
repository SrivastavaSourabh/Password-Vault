import bcrypt from 'bcryptjs';
import User from '@/lib/models/User';

export class AuthController {
  static async register(email: string, password: string) {
    try {
      // Validation
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      // Sanitize inputs
      const sanitizedEmail = email.trim().toLowerCase();
      const sanitizedPassword = password.trim();

      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(sanitizedEmail)) {
        throw new Error('Invalid email format');
      }

      if (sanitizedPassword.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }

      if (sanitizedPassword.length > 128) {
        throw new Error('Password must be less than 128 characters');
      }

      // Check if user already exists
      const existingUser = await User.findOne({ email: sanitizedEmail });
      if (existingUser) {
        throw new Error('User already exists');
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(sanitizedPassword, 12);

      // Create user
      const user = new User({
        email: sanitizedEmail,
        password: hashedPassword,
      });

      await user.save();

      return {
        success: true,
        message: 'User created successfully',
        data: {
          userId: user._id.toString(),
          email: user.email
        }
      };
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  static async login(email: string, password: string) {
    try {
      // Validation
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      // Sanitize inputs
      const sanitizedEmail = email.trim().toLowerCase();
      const sanitizedPassword = password.trim();

      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(sanitizedEmail)) {
        throw new Error('Invalid email format');
      }

      // Find user
      const user = await User.findOne({ email: sanitizedEmail });
      if (!user) {
        throw new Error('Invalid credentials');
      }

      // Check password
      const isPasswordValid = await bcrypt.compare(sanitizedPassword, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid credentials');
      }

      return {
        success: true,
        message: 'Login successful',
        data: {
          userId: user._id.toString(),
          email: user.email
        }
      };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }
}
