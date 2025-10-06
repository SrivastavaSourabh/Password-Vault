import { AuthController } from '@/lib/controllers/AuthController';
import { ValidationMiddleware } from '@/lib/middleware/validation';
import { ErrorHandler } from '@/lib/middleware/errorHandler';

export class AuthService {
  static async registerUser(email: string, password: string) {
    try {
      // Validate input
      if (!ValidationMiddleware.validateEmail(email)) {
        throw ErrorHandler.createError('Invalid email format', 400);
      }

      const passwordValidation = ValidationMiddleware.validatePassword(password);
      if (!passwordValidation.isValid) {
        throw ErrorHandler.createError(passwordValidation.error!, 400);
      }

      // Sanitize input
      const sanitizedEmail = ValidationMiddleware.sanitizeInput(email);

      // Call controller
      const result = await AuthController.register(sanitizedEmail, password);
      return result;
    } catch (error) {
      const { message, statusCode } = ErrorHandler.handleError(error);
      throw ErrorHandler.createError(message, statusCode);
    }
  }

  static async loginUser(email: string, password: string) {
    try {
      // Validate input
      if (!ValidationMiddleware.validateEmail(email)) {
        throw ErrorHandler.createError('Invalid email format', 400);
      }

      if (!password) {
        throw ErrorHandler.createError('Password is required', 400);
      }

      // Sanitize input
      const sanitizedEmail = ValidationMiddleware.sanitizeInput(email);

      // Call controller
      const result = await AuthController.login(sanitizedEmail, password);
      return result;
    } catch (error) {
      const { message, statusCode } = ErrorHandler.handleError(error);
      throw ErrorHandler.createError(message, statusCode);
    }
  }
}

