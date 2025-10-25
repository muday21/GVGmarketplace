# Authentication Flow Documentation

## Overview
This Next.js application now has a complete authentication flow with role-based redirects.

## How It Works

### 1. **Sign In** (`/auth/signin`)
When users log in, the system:
- Checks the email for keywords to determine role
- Stores authentication data in localStorage
- Redirects to the appropriate dashboard

### 2. **Role Detection**
The email determines the user role:
- Email contains **"producer"** → Producer Dashboard (`/dashboard/producer`)
- Email contains **"admin"** → Admin Dashboard (`/dashboard/admin`)
- Default → Buyer Dashboard (`/dashboard/buyer`)

### 3. **Demo Login Credentials**
Use these emails to test different roles:
- `producer@example.com` - Producer Dashboard
- `admin@example.com` - Admin Dashboard  
- `buyer@example.com` - Buyer Dashboard
- Any password works (demo mode)

### 4. **Sign Up** (`/auth/signup`)
When users register:
- Select role (Producer or Buyer)
- System stores user data
- Redirects to appropriate dashboard based on selected role

### 5. **Header Navigation**
The header dynamically shows:
- **Not Authenticated**: Sign In and Sign Up buttons
- **Authenticated**: 
  - Shopping Cart icon
  - User Profile icon (links to dashboard)
  - Logout button
  - Dashboard link in navigation

### 6. **Logout**
Clicking logout:
- Clears all localStorage data
- Resets authentication state
- Redirects to home page

## Storage
User data is stored in localStorage:
- `isAuthenticated`: "true" or removed
- `userRole`: "PRODUCER", "ADMIN", or "BUYER"
- `userEmail`: User's email
- `userName`: User's name (from signup)

## Dashboards

### Producer Dashboard (`/dashboard/producer`)
- View total products
- Active batches
- Pending/completed orders
- Manage products

### Buyer Dashboard (`/dashboard/buyer`)
- View total orders
- Active orders status
- Order history

### Admin Dashboard (`/dashboard/admin`)
- Platform statistics
- Total users
- Total products
- Revenue overview

## Future Enhancements
To connect to real authentication (Supabase):
1. Replace localStorage with Supabase Auth
2. Update `handleSubmit` in signin/signup to use Supabase API
3. Add proper session management
4. Implement protected routes middleware
5. Add email verification
6. Add password reset functionality

## Files Modified
- `src/app/auth/signin/page.tsx` - Added redirect logic
- `src/app/auth/signup/page.tsx` - Added redirect logic
- `src/components/layout/Header.tsx` - Added auth state and logout
- All dashboard pages - Ready for authenticated users

