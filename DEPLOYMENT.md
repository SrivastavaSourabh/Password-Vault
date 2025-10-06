# Deployment Guide

## Prerequisites
- MongoDB Atlas account (free tier available)
- Vercel account (free tier available)

## Step 1: Set up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster
4. Create a database user
5. Get your connection string (it will look like: `mongodb+srv://username:password@cluster.mongodb.net/password-vault`)

## Step 2: Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your GitHub repository
4. Add environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `NEXTAUTH_SECRET`: A random secret string
   - `NEXTAUTH_URL`: Your Vercel deployment URL

## Step 3: Test the Application

1. Visit your deployed URL
2. Create an account
3. Test password generation
4. Test vault functionality
5. Verify encryption (check that database only contains encrypted data)

## Environment Variables

Create a `.env.local` file for local development:

```env
MONGODB_URI=mongodb://localhost:27017/password-vault
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
```

## Security Notes

- All vault data is encrypted client-side using AES-256-CBC
- Passwords are hashed using bcrypt with 12 rounds
- No plaintext sensitive data is stored on the server
- The encryption key is derived from the user's password using PBKDF2

## Troubleshooting

- If MongoDB connection fails, check your connection string
- If encryption fails, ensure the user password is correct
- If build fails, check that all dependencies are installed
