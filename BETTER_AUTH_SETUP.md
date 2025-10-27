# GVG Blockchain Marketplace - Better Auth Integration

This project now includes Better Auth for authentication and authorization.

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/gvg_marketplace"

# Better Auth
BETTER_AUTH_SECRET="your-secret-key-here"
BETTER_AUTH_URL="http://localhost:3000"

# Social Providers (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 2. Database Setup

1. Create a PostgreSQL database named `gvg_marketplace`
2. Run the database migrations:

```bash
npm run db:generate
npm run db:push
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start Development Server

```bash
npm run dev
```

## Features Implemented

- ✅ Email and password authentication
- ✅ Social sign-in with Google and GitHub (optional)
- ✅ User roles (BUYER, PRODUCER, ADMIN)
- ✅ Session management
- ✅ Protected routes with middleware
- ✅ User profile management
- ✅ Sign out functionality

## Database Schema

The following tables are created:
- `user` - User information including role
- `account` - Authentication accounts
- `session` - User sessions
- `verification` - Email verification tokens

## API Routes

- `/api/auth/[...all]` - Better Auth API endpoints

## Components

- `AuthProvider` - Provides authentication context
- `UserProfile` - Displays user information and sign out
- Updated sign-in and sign-up pages to use Better Auth

## Usage

### Sign Up
Users can sign up with email and password. The role is set to "BUYER" by default.

### Sign In
Users can sign in with their email and password.

### Session Management
Use the `useSession` hook to access user session data:

```tsx
import { authClient } from '@/lib/auth-client';

const { data: session, isPending, error } = authClient.useSession();
```

### Sign Out
```tsx
await authClient.signOut();
```

## Next Steps

1. Set up your PostgreSQL database
2. Configure environment variables
3. Run database migrations
4. Test authentication flow
5. Customize user roles and permissions as needed

