# Password Generator + Secure Vault

A secure web application for generating strong passwords and storing them in an encrypted personal vault.

## Features

### Must-Have Features ✅
- **Password Generator**
  - Length slider (4-50 characters)
  - Options to include numbers, letters, and symbols
  - Exclude look-alike characters (l, 1, I, O, 0)
  - Real-time password strength indicator
- **Simple Authentication**
  - User registration and login with email/password
  - Secure password hashing with bcrypt
- **Vault Items**
  - Store: title, username, password, URL, and notes
  - Full CRUD operations (Create, Read, Update, Delete)
- **Client-side Encryption**
  - All vault data encrypted using AES-256-CBC
  - Server never stores plaintext vault data
  - Uses PBKDF2 for key derivation
- **Copy to Clipboard**
  - One-click copy for generated and stored passwords
  - Auto-clear notifications after 2 seconds

### Nice-to-Have Features ✅
- **Basic Search/Filter** - Search vault items by title, username, URL, or notes
- **Clean UI** - Minimal, fast, and responsive design

## Tech Stack

- **Frontend**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB with Mongoose
- **Authentication**: bcryptjs for password hashing
- **Encryption**: crypto-js for client-side encryption
- **Deployment**: Ready for Vercel/Netlify

## Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB (local or cloud)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd password-vault
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
MONGODB_URI=mongodb://localhost:27017/password-vault
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Security Features

### Client-side Encryption
- **Library**: crypto-js
- **Algorithm**: AES-256-CBC
- **Key Derivation**: PBKDF2 with 1000 iterations
- **Why**: Ensures that even if the database is compromised, vault data remains encrypted and unreadable without the user's password.

### Password Security
- Passwords are hashed using bcrypt with 12 rounds
- No plaintext passwords are stored on the server
- Strong password generation with configurable options

## Usage

1. **Sign Up/Login**: Create an account or sign in with existing credentials
2. **Generate Password**: Use the password generator with customizable options
3. **Save to Vault**: Add vault items with encrypted storage
4. **Manage Items**: View, edit, delete, and search your vault items
5. **Copy Passwords**: One-click copy with auto-clear notifications

## API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/vault?userId={id}` - Get user's vault items
- `POST /api/vault` - Create new vault item
- `PUT /api/vault/{id}` - Update vault item
- `DELETE /api/vault/{id}` - Delete vault item

## Deployment

The application is ready for deployment on platforms like Vercel or Netlify:

1. Set up MongoDB Atlas (cloud) or use a local MongoDB instance
2. Update the `MONGODB_URI` environment variable
3. Deploy to your preferred platform

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## License

ISC License
