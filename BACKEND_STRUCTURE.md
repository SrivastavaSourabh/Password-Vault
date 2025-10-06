# Backend Structure Documentation

## Overview
This project now follows a clean, systematic backend architecture with proper separation of concerns, making the code maintainable, scalable, and easy to understand.

## Directory Structure
```
src/lib/
├── controllers/          # Business logic controllers
│   ├── AuthController.ts
│   └── VaultController.ts
├── middleware/           # Cross-cutting concerns
│   ├── validation.ts
│   └── errorHandler.ts
├── services/            # Service layer (orchestrates controllers)
│   ├── AuthService.ts
│   └── VaultService.ts
├── models/              # Database models
│   ├── User.ts
│   └── VaultItem.ts
├── encryption.ts        # Encryption utilities
└── mongodb.ts          # Database connection
```

## Architecture Layers

### 1. Controllers (`/controllers`)
**Purpose**: Handle core business logic and database operations

#### AuthController
- `register(email, password)` - User registration with validation
- `login(email, password)` - User authentication

#### VaultController
- `getVaultItems(userId)` - Fetch user's vault items
- `createVaultItem(encryptedData, userId)` - Create new vault item
- `updateVaultItem(id, encryptedData)` - Update existing vault item
- `deleteVaultItem(id)` - Delete vault item
- `encryptAndSaveVaultItem(item, userPassword, userId)` - Helper method
- `decryptVaultItems(encryptedItems, userPassword)` - Helper method

### 2. Services (`/services`)
**Purpose**: Orchestrate controllers and handle business rules

#### AuthService
- `registerUser(email, password)` - Complete registration flow with validation
- `loginUser(email, password)` - Complete login flow with validation

#### VaultService
- `getVaultItems(userId)` - Complete vault items retrieval
- `createVaultItem(encryptedData, userId)` - Complete vault item creation
- `updateVaultItem(id, encryptedData)` - Complete vault item update
- `deleteVaultItem(id)` - Complete vault item deletion
- `encryptAndSaveVaultItem(item, userPassword, userId)` - Complete encryption and save

### 3. Middleware (`/middleware`)
**Purpose**: Handle cross-cutting concerns like validation and error handling

#### ValidationMiddleware
- `validateEmail(email)` - Email format validation
- `validatePassword(password)` - Password strength validation
- `validateVaultItem(item)` - Vault item data validation
- `validateObjectId(id)` - MongoDB ObjectId validation
- `sanitizeInput(input)` - Input sanitization
- `validateEncryptedData(data)` - Encrypted data validation

#### ErrorHandler
- `handleError(error)` - Centralized error handling with proper status codes
- `createError(message, statusCode)` - Create custom errors

### 4. API Routes (`/app/api`)
**Purpose**: Next.js API endpoints that use the service layer

- `/api/auth/register` - User registration
- `/api/auth/login` - User login
- `/api/vault` - Vault items CRUD operations
- `/api/vault/[id]` - Individual vault item operations

## Data Flow

```
API Route → Service → Controller → Database
    ↓         ↓         ↓
Middleware → Validation → Error Handling
```

### Example Flow:
1. **API Route** receives request
2. **Service** validates input and orchestrates business logic
3. **Controller** handles database operations
4. **Middleware** provides validation and error handling
5. **Response** is returned with proper error handling

## Benefits of This Architecture

### 1. Separation of Concerns
- **Controllers**: Pure business logic
- **Services**: Business rules and orchestration
- **Middleware**: Cross-cutting concerns
- **API Routes**: HTTP handling only

### 2. Maintainability
- Easy to locate and modify specific functionality
- Clear responsibility boundaries
- Consistent error handling across all endpoints

### 3. Scalability
- Easy to add new features by creating new controllers/services
- Middleware can be reused across different endpoints
- Modular structure supports team development

### 4. Testability
- Each layer can be unit tested independently
- Controllers can be tested without HTTP concerns
- Services can be tested without database dependencies

### 5. Code Reusability
- Controllers can be reused in different contexts
- Services can be called from different API routes
- Middleware can be applied to multiple endpoints

## Usage Examples

### Adding a New Feature

#### 1. Create Controller
```typescript
// src/lib/controllers/NewController.ts
export class NewController {
  static async someMethod(data: any) {
    // Business logic here
  }
}
```

#### 2. Create Service
```typescript
// src/lib/services/NewService.ts
import { NewController } from '@/lib/controllers/NewController';
import { ValidationMiddleware } from '@/lib/middleware/validation';

export class NewService {
  static async processData(data: any) {
    // Validation
    if (!ValidationMiddleware.validateData(data)) {
      throw new Error('Invalid data');
    }
    
    // Call controller
    return await NewController.someMethod(data);
  }
}
```

#### 3. Create API Route
```typescript
// src/app/api/new/route.ts
import { NewService } from '@/lib/services/NewService';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const result = await NewService.processData(data);
    return NextResponse.json(result.data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode || 500 }
    );
  }
}
```

## Error Handling

All errors are handled consistently:
- **Validation errors**: 400 status code
- **Authentication errors**: 401 status code
- **Not found errors**: 404 status code
- **Server errors**: 500 status code

## Response Format

### Success Response
```json
{
  "data": {
    // Response data
  }
}
```

### Error Response
```json
{
  "error": "Error message"
}
```

This architecture provides a solid foundation for building scalable, maintainable applications while keeping the code clean and organized.

