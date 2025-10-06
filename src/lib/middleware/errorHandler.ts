export class ErrorHandler {
  static handleError(error: any): { message: string; statusCode: number } {
    console.error('Error:', error);

    // Handle specific error types
    if (error.name === 'ValidationError') {
      return {
        message: 'Validation error',
        statusCode: 400
      };
    }

    if (error.name === 'CastError') {
      return {
        message: 'Invalid ID format',
        statusCode: 400
      };
    }

    if (error.name === 'MongoError' && error.code === 11000) {
      return {
        message: 'Duplicate field value',
        statusCode: 400
      };
    }

    if (error.message === 'User already exists') {
      return {
        message: error.message,
        statusCode: 400
      };
    }

    if (error.message === 'Invalid credentials') {
      return {
        message: error.message,
        statusCode: 401
      };
    }

    if (error.message === 'Vault item not found') {
      return {
        message: error.message,
        statusCode: 404
      };
    }

    // Default error
    return {
      message: error.message || 'Internal server error',
      statusCode: 500
    };
  }

  static createError(message: string, statusCode: number = 500): Error {
    const error = new Error(message) as any;
    error.statusCode = statusCode;
    return error;
  }
}

