# Environment Variables Setup

## Create .env.local file

Create a file named `.env.local` in the root directory of your project with the following content:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/password-vault

# NextAuth Configuration
NEXTAUTH_SECRET=your-super-secret-key-change-this-in-production
NEXTAUTH_URL=http://localhost:3000
```

## Environment Variables Explained

### MONGODB_URI
- **Local Development**: `mongodb://localhost:27017/password-vault`
  - This assumes MongoDB is running locally on your machine
  - If MongoDB is running on a different port, adjust accordingly

- **Production (MongoDB Atlas)**: `mongodb+srv://username:password@cluster.mongodb.net/password-vault`
  - Replace `username`, `password`, and `cluster` with your actual MongoDB Atlas credentials
  - Get this from your MongoDB Atlas dashboard

### NEXTAUTH_SECRET
- A random secret string used for JWT signing and encryption
- **Important**: Change this to a secure random string in production
- You can generate one using: `openssl rand -base64 32`

### NEXTAUTH_URL
- **Local Development**: `http://localhost:3000`
- **Production**: Your actual domain (e.g., `https://your-app.vercel.app`)

## Steps to Set Up

1. **Create the file manually:**
   - In your project root directory (`password-vault/`)
   - Create a new file named `.env.local`
   - Copy the content from above

2. **For local MongoDB:**
   - Install MongoDB locally or use Docker
   - Start MongoDB service
   - Use the local connection string

3. **For MongoDB Atlas (recommended for production):**
   - Sign up at [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a free cluster
   - Create a database user
   - Get your connection string
   - Replace the MONGODB_URI in .env.local

## Security Notes

- Never commit `.env.local` to version control
- Use different secrets for development and production
- Keep your MongoDB credentials secure
- The `.env.local` file is already in `.gitignore`

## Testing the Setup

After creating the `.env.local` file:

1. Restart your development server:
   ```bash
   npx next dev
   ```

2. The application should now connect to your database
3. You can create an account and test the functionality
