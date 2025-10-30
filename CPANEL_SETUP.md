# cPanel Database Setup Guide

## Step 1: Get Your cPanel Database Credentials

1. Log into your cPanel
2. Go to **MySQL Databases** section
3. Note down:
   - Database name
   - Username
   - Password
   - Host (usually your domain or IP)
   - Port (usually 3306)

## Step 2: Create Environment File

1. Copy `env.template` to `.env`:
   ```bash
   cp env.template .env
   ```

2. Edit `.env` with your actual credentials:
   ```
   DATABASE_URL="mysql://your_username:your_password@your_host:3306/your_database_name"
   ```

## Step 3: Test Connection

Run the connection test:
```bash
npm run db:test
```

## Step 4: Generate Prisma Client

```bash
npm run db:generate
```

## Step 5: Sync Database Schema

```bash
npx prisma db push
```

## Step 6: Start Development Server

```bash
npm run dev
```

## Troubleshooting

### Connection Issues
- **ECONNREFUSED**: Check host/port, ensure remote connections are allowed
- **Access denied**: Verify username/password, check user permissions
- **SSL errors**: Try adding `?sslmode=require` or `?sslmode=disable` to DATABASE_URL

### cPanel Specific Settings
- Enable "Remote MySQL" in cPanel
- Add your local IP to the allowed hosts
- Use SSL if available: `?sslmode=require`

### Common DATABASE_URL Formats
```
# Basic connection
mysql://user:pass@host:3306/database

# With SSL
mysql://user:pass@host:3306/database?sslmode=require

# With SSL and specific options
mysql://user:pass@host:3306/database?sslmode=require&ssl=true
```

## Database Management Commands

```bash
# View database in browser
npx prisma studio

# Reset database (WARNING: deletes all data)
npx prisma db push --force-reset

# Generate migration files
npx prisma migrate dev --name init
```






