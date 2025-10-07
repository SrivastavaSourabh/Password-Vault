# Password Generator + Secure Vault

Robust Next.js application to generate strong passwords and store them securely in an encrypted personal vault. Client-side encryption ensures the server never sees plaintext secrets.

---

## Features

### Must‑Have ✅
- **Password Generator**
  - Length slider (4–50)
  - Include numbers, letters, symbols
  - Exclude look‑alike characters (l, 1, I, O, 0)
  - Real‑time strength indicator
- **Authentication**
  - Email/password registration and login
  - Password hashing with bcrypt
- **Vault**
  - Fields: title, username, password, URL, notes
  - Full CRUD (create, read, update, delete)
- **Client‑side Encryption**
  - AES‑256‑CBC via crypto‑js
  - PBKDF2 key derivation
  - Server stores only ciphertext
- **Copy to Clipboard**
  - One‑click copy for generated and stored passwords
  - Auto‑clear notifications

### Nice‑to‑Have ✅
- **Search/Filter** across title, username, URL, notes
- **Responsive UI** with Tailwind CSS

---

## Tech Stack
- **Framework**: Next.js 15 (App Router) + TypeScript
- **UI**: Tailwind CSS
- **Database**: MongoDB + Mongoose
- **Auth**: bcryptjs (hashing)
- **Crypto**: crypto‑js (AES, PBKDF2)

---

## Project Structure

```text
src/
  app/
    api/
      auth/
        login/route.ts
        register/route.ts
      vault/
        [id]/route.ts
        route.ts
    layout.tsx
    page.tsx
  components/
    AuthForm.tsx
    PasswordGenerator.tsx
    VaultItemCard.tsx
    VaultItemForm.tsx
    VaultList.tsx
  lib/
    clipboard.ts
    controllers/
      AuthController.ts
      VaultController.ts
    encryption.ts
    middleware/
      errorHandler.ts
      validation.ts
    models/
      User.ts
      VaultItem.ts
    mongodb.ts
    passwordGenerator.ts
    services/
      AuthService.ts
      VaultService.ts
  types/
    index.ts
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- A MongoDB instance (local or Atlas)

### Setup
1) Clone and install dependencies
```bash
git clone <your-repo-url>
cd "Password Generator+Secure Vault"
npm install
```

2) Create environment file
Create a `.env.local` in the repository root:
```env
MONGODB_URI=mongodb://localhost:27017/password-vault
```

3) Run the app
```bash
npm run dev
```
Open http://localhost:3000

---

## Scripts
- `npm run dev` — Start development server
- `npm run build` — Create production build
- `npm run start` — Run production server
- `npm run lint` — Lint the codebase

---

## Security

### Client‑side Encryption
- Library: crypto‑js
- Algorithm: AES‑256‑CBC
- Key derivation: PBKDF2 (iterations configured in code)
- Rationale: Database compromise does not reveal plaintext vault data.

### Password Handling
- User passwords hashed with bcrypt (no plaintext storage)
- Strong generated passwords with configurable options

---

## REST API
- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and establish session
- `GET /api/vault?userId={id}` — List vault items for a user
- `POST /api/vault` — Create a vault item
- `PUT /api/vault/{id}` — Update a vault item
- `DELETE /api/vault/{id}` — Delete a vault item

---

## Development Notes
- Connects to MongoDB via `src/lib/mongodb.ts`
- Business logic in `src/lib/services/*` and `src/lib/controllers/*`
- UI components under `src/components/*`

---

## Deployment
1) Provide `MONGODB_URI` in your environment (e.g., Vercel project settings)
2) Build and deploy
3) Ensure your MongoDB network access allows the host

---

## Contributing
1) Fork and create a feature branch
2) Run `npm run lint` and fix issues
3) Submit a PR with a clear description

---

## License
ISC License
