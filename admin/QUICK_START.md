# Quick Start Guide - GIG Admin Dashboard

## 🚀 Get Started in 5 Minutes

### Step 1: Set Up Environment Variables

Create a `.env` file in the project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

📝 Get these from your Supabase project: Settings → API

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Create Admin User

#### In Supabase Dashboard:

1. **Create Auth User**:
   - Go to Authentication → Users
   - Click "Add User" → "Create new user"
   - Email: `admin@gig.et`
   - Password: `admin123` (or your preferred password)
   - Auto Confirm User: ✅

2. **Add Admin Record** (SQL Editor):
   ```sql
   INSERT INTO admin_users (email, full_name, role, status)
   VALUES ('admin@gig.et', 'Admin User', 'super_admin', 'active');
   ```

### Step 4: Run the Application

```bash
npm run dev
```

Open http://localhost:3000

### Step 5: Login

- **Email**: `admin@gig.et`
- **Password**: `admin123` (or your set password)

## 🎯 What You Get

✅ **Dashboard** - Real-time statistics and overview
✅ **Products** - Full CRUD with 4 sample products
✅ **Customers** - Manage customer database (3 sample customers)
✅ **Producers** - Supplier management (3 sample producers)
✅ **Admin Users** - User management with role-based access

## 📊 Sample Data Included

The database comes pre-populated with:
- **3 Producers** (Ethiopian suppliers)
- **4 Products** (Coffee, Sesame Seeds, Leather Bag, Teff)
- **3 Customers** (International buyers)

## 🔑 Key Features

- **Search & Filter** - Real-time search across all pages
- **Form Validation** - Client-side validation for all inputs
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Protected Routes** - Authentication required for all admin pages
- **Delete Confirmation** - Safety dialogs for destructive actions
- **Loading States** - Visual feedback for all async operations

## 🎨 Interface Overview

### Sidebar Navigation
- Dashboard - Overview and quick actions
- Products - Product catalog management
- Customers - Customer database
- Producers - Supplier network
- Admin Users - User account management
- Sign Out - Secure logout

### Product Categories
- Coffee
- Grains & Seeds
- Leather Goods
- Spices
- Textiles
- Honey
- Other

### User Roles
- **Super Admin** - Full access
- **Admin** - Standard admin access
- **Moderator** - Limited management access

## 🛠️ Common Tasks

### Add a New Product
1. Go to Products
2. Click "Add Product"
3. Fill in details (name, price, stock, category)
4. Select a producer
5. Add image URL (optional)
6. Click "Create Product"

### Manage Customer Status
1. Go to Customers
2. Click edit icon on customer card
3. Change status to active/inactive
4. Update total orders if needed
5. Click "Update Customer"

### Verify a Producer
1. Go to Producers
2. Click edit icon on producer card
3. Change verification status to "verified"
4. Update status to "active"
5. Click "Update Producer"

### Create Admin User
1. Go to Admin Users
2. Click "Add Admin User"
3. Enter name, email, role
4. Set status to "active"
5. Click "Create User"

⚠️ **Note**: For the admin user to login, you must also create them in Supabase Auth (Authentication → Users)

## 🔒 Security Notes

- All tables protected with Row Level Security (RLS)
- Authentication required for all admin operations
- HTTPS required for production
- Environment variables kept secure
- No sensitive data in client-side code

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🐛 Troubleshooting

**Can't login?**
- Check user exists in Supabase Auth
- Verify email matches admin_users table
- Clear browser cache

**Database errors?**
- Confirm environment variables
- Check RLS policies are enabled
- Verify Supabase project is active

**Build fails?**
```bash
rm -rf .next node_modules
npm install
npm run build
```

## 📚 Next Steps

1. Customize the color scheme in `tailwind.config.ts`
2. Add your company logo in `AdminSidebar.tsx`
3. Configure email templates in Supabase
4. Set up custom domain
5. Deploy to Vercel or your preferred platform

## 🎉 You're Ready!

Your admin dashboard is fully functional with:
- Authentication ✅
- Database with sample data ✅
- Full CRUD operations ✅
- Responsive design ✅
- Professional UI ✅

For detailed documentation, see `ADMIN_DASHBOARD_README.md`
