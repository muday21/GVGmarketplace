# GIG Admin Dashboard

A comprehensive Next.js-based admin dashboard for managing the GIG Supply Chain Platform. This dashboard provides full CRUD operations for products, customers, producers, and admin users.

## Features

### Authentication
- Secure email/password authentication using Supabase Auth
- Protected routes requiring authentication
- Session management with automatic redirects
- Role-based access control

### Dashboard Overview
- Real-time statistics for products, customers, producers, and users
- Quick action links to all management sections
- Platform status overview
- Clean, professional interface with emerald green theme

### Product Management
- Create, read, update, and delete products
- Product categorization (Coffee, Grains & Seeds, Leather Goods, etc.)
- Stock quantity tracking
- Price management
- Producer assignment
- Image URL support
- Status management (active, inactive, out_of_stock)
- Search and filter functionality

### Customer Management
- Full customer database management
- Contact information tracking (email, phone, address)
- Location tracking (city, country)
- Order history tracking
- Customer status management (active, inactive)
- Advanced search capabilities

### Producer Management
- Producer/supplier network management
- Company and contact person details
- Verification status tracking (verified, pending, rejected)
- Product count tracking
- Status management
- Location and contact information

### User Management
- Admin user account management
- Role assignment (super_admin, admin, moderator)
- User status control (active, inactive)
- Permission management capabilities

## Tech Stack

- **Framework**: Next.js 13+ (App Router)
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Context API

## Database Schema

### Tables

1. **admin_users**
   - id (uuid, primary key)
   - email (text, unique)
   - full_name (text)
   - role (text)
   - status (text)
   - created_at, updated_at

2. **products**
   - id (uuid, primary key)
   - name (text)
   - description (text)
   - category (text)
   - price (decimal)
   - stock_quantity (integer)
   - producer_id (uuid, foreign key)
   - image_url (text)
   - status (text)
   - created_at, updated_at

3. **customers**
   - id (uuid, primary key)
   - email (text, unique)
   - full_name (text)
   - phone, address, city, country (text)
   - status (text)
   - total_orders (integer)
   - created_at, updated_at

4. **producers**
   - id (uuid, primary key)
   - email (text, unique)
   - company_name (text)
   - contact_person (text)
   - phone, address, city, country (text)
   - status (text)
   - verification_status (text)
   - total_products (integer)
   - created_at, updated_at

All tables have Row Level Security (RLS) enabled with policies for authenticated users.

## Setup Instructions

### Prerequisites
- Node.js 18+ installed
- Supabase account and project
- Git (optional)

### 1. Environment Variables

Create a `.env` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Get these values from your Supabase project settings:
1. Go to your Supabase project dashboard
2. Navigate to Settings > API
3. Copy the Project URL and anon/public key

### 2. Install Dependencies

```bash
npm install
```

### 3. Database Setup

The database tables and RLS policies have been automatically created via migration. The following sample data is included:

**Producers:**
- Sidama Coffee Cooperative
- Tigray Agricultural Union
- Addis Leather Works

**Products:**
- Ethiopian Yirgacheffe Coffee
- Humera Sesame Seeds
- Handcrafted Leather Bag
- Organic Teff Grain

**Customers:**
- John Anderson (USA)
- Marie Dubois (France)
- Ahmed Hassan (UAE)

### 4. Create Admin User

You need to create an admin user in Supabase Auth:

#### Option A: Using Supabase Dashboard
1. Go to Authentication > Users in your Supabase dashboard
2. Click "Invite User" or "Add User"
3. Enter email and password
4. The user will be created in auth.users

#### Option B: Using SQL
Run this SQL in your Supabase SQL Editor to insert a demo admin user record:

```sql
INSERT INTO admin_users (email, full_name, role, status)
VALUES ('admin@gig.et', 'Admin User', 'super_admin', 'active');
```

**Important**: You must also create this user in Supabase Auth (Authentication > Users) with the same email for login to work.

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Build for Production

```bash
npm run build
npm start
```

## Usage

### Logging In

1. Navigate to the admin portal (automatically redirects from home page)
2. Enter admin credentials:
   - Email: admin@gig.et (or your created admin email)
   - Password: (your set password)
3. Click "Sign In"

### Managing Products

1. Navigate to "Products" from the sidebar
2. Click "Add Product" to create a new product
3. Fill in product details (name, category, price, stock, etc.)
4. Select a producer from the dropdown
5. Click "Create Product"

To edit or delete:
- Click the edit icon to modify a product
- Click the trash icon to delete (with confirmation)

### Managing Customers

1. Navigate to "Customers" from the sidebar
2. Click "Add Customer" to create a new customer
3. Fill in customer information
4. Manage customer status (active/inactive)
5. Track total orders

### Managing Producers

1. Navigate to "Producers" from the sidebar
2. Add producer company information
3. Set verification status (verified, pending, rejected)
4. Track producer status and product counts

### Managing Admin Users

1. Navigate to "Admin Users" from the sidebar
2. Create new admin accounts
3. Assign roles (super_admin, admin, moderator)
4. Control user access via status (active/inactive)

### Searching and Filtering

All management pages include search functionality:
- Type in the search box to filter results in real-time
- Search works across multiple fields (name, email, category, city, etc.)

## Project Structure

```
/project
├── app/
│   ├── admin/
│   │   ├── login/page.tsx          # Admin login page
│   │   ├── dashboard/page.tsx      # Main dashboard
│   │   ├── products/page.tsx       # Product management
│   │   ├── customers/page.tsx      # Customer management
│   │   ├── producers/page.tsx      # Producer management
│   │   └── users/page.tsx          # Admin user management
│   ├── layout.tsx                  # Root layout with AuthProvider
│   └── page.tsx                    # Home page (redirects to login)
├── components/
│   ├── admin/
│   │   ├── AdminLayout.tsx         # Admin page layout
│   │   ├── AdminSidebar.tsx        # Navigation sidebar
│   │   ├── ProductFormDialog.tsx   # Product CRUD form
│   │   ├── CustomerFormDialog.tsx  # Customer CRUD form
│   │   ├── ProducerFormDialog.tsx  # Producer CRUD form
│   │   ├── AdminUserFormDialog.tsx # User CRUD form
│   │   └── DeleteConfirmDialog.tsx # Delete confirmation
│   ├── ui/                         # shadcn/ui components
│   └── ProtectedRoute.tsx          # Auth guard component
├── contexts/
│   └── AuthContext.tsx             # Authentication context
├── lib/
│   ├── supabase.ts                 # Supabase client & types
│   └── utils.ts                    # Utility functions
└── hooks/
    └── use-toast.ts                # Toast notifications
```

## Security Features

### Row Level Security (RLS)
All database tables have RLS enabled with policies that:
- Require authentication for all operations
- Validate user access for each request
- Prevent unauthorized data access

### Authentication
- Session-based authentication via Supabase Auth
- Automatic token refresh
- Protected routes with auth guards
- Secure password handling

### Data Validation
- Client-side form validation
- Required field enforcement
- Type checking with TypeScript
- SQL injection prevention via Supabase client

## Design Principles

### Color Scheme
- Primary: Emerald Green (#059669)
- Secondary: Slate Gray
- Accent colors for different statuses and roles
- Clean, professional aesthetic

### Responsive Design
- Mobile-first approach
- Responsive grid layouts
- Adaptive sidebar navigation
- Touch-friendly UI elements

### User Experience
- Intuitive navigation
- Clear visual feedback
- Loading states for async operations
- Confirmation dialogs for destructive actions
- Search and filter capabilities
- Toast notifications for success/error messages

## Troubleshooting

### Authentication Issues
- Verify environment variables are set correctly
- Check Supabase Auth user exists
- Ensure admin_users table has matching record
- Clear browser cache and cookies

### Database Connection
- Confirm Supabase URL and keys are correct
- Check RLS policies are enabled
- Verify user authentication in Supabase dashboard

### Build Errors
- Run `npm install` to ensure all dependencies are installed
- Clear `.next` folder: `rm -rf .next`
- Check TypeScript errors: `npm run typecheck`

## Future Enhancements

Potential features for future development:
- Password reset functionality
- User activity logs
- Advanced analytics and reporting
- Bulk operations (import/export)
- Image upload to Supabase Storage
- Order management system
- Real-time notifications
- Multi-language support
- Dark mode toggle
- Advanced filtering and sorting
- Data visualization with charts

## Support

For issues or questions:
1. Check the Supabase documentation: https://supabase.com/docs
2. Review Next.js documentation: https://nextjs.org/docs
3. Check shadcn/ui components: https://ui.shadcn.com

## License

This project is part of the GIG Supply Chain Platform.
