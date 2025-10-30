# MySQL Local Setup Guide

## 🚀 MySQL Installation Complete!

MySQL 8.4.6 has been installed on your system. Now we need to configure it.

## 🔧 Next Steps:

### Step 1: Initialize MySQL (First Time Setup)
MySQL needs to be initialized before it can run. Run this command as Administrator:

```powershell
# Open PowerShell as Administrator and run:
mysqld --initialize --console
```

This will:
- Create the data directory
- Generate a temporary root password
- Set up the initial database structure

### Step 2: Start MySQL Service
After initialization, start the MySQL service:

```powershell
# Start MySQL service
net start mysql80

# Or if that doesn't work, try:
net start mysql
```

### Step 3: Connect and Set Root Password
Connect to MySQL and set a root password:

```powershell
# Connect to MySQL (use the temporary password from Step 1)
mysql -u root -p

# Once connected, set a new password:
ALTER USER 'root'@'localhost' IDENTIFIED BY 'your_new_password';
FLUSH PRIVILEGES;
EXIT;
```

### Step 4: Create Database and User for Your Project
```sql
-- Create database
CREATE DATABASE greenvbw_greenblockchainproject;

-- Create user
CREATE USER 'greenvbw_greenvb'@'localhost' IDENTIFIED BY 'xQV=,{cfej{AgHtN';

-- Grant privileges
GRANT ALL PRIVILEGES ON greenvbw_greenblockchainproject.* TO 'greenvbw_greenvb'@'localhost';
FLUSH PRIVILEGES;
```

### Step 5: Update Your .env File
Update your `.env` file to use local MySQL:

```
DATABASE_URL="mysql://greenvbw_greenvb:xQV=,{cfej{AgHtN@localhost:3306/greenvbw_greenblockchainproject"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
BETTER_AUTH_SECRET="your-better-auth-secret-here"
BETTER_AUTH_URL="http://localhost:3000"
```

## 🎯 Quick Setup Commands:

Run these commands in PowerShell as Administrator:

```powershell
# 1. Initialize MySQL
mysqld --initialize --console

# 2. Start MySQL service
net start mysql80

# 3. Connect and setup (use temp password from step 1)
mysql -u root -p

# 4. In MySQL prompt, run:
ALTER USER 'root'@'localhost' IDENTIFIED BY 'your_password';
CREATE DATABASE greenvbw_greenblockchainproject;
CREATE USER 'greenvbw_greenvb'@'localhost' IDENTIFIED BY 'xQV=,{cfej{AgHtN';
GRANT ALL PRIVILEGES ON greenvbw_greenblockchainproject.* TO 'greenvbw_greenvb'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

## 🔍 Troubleshooting:

### If MySQL service won't start:
1. Check if port 3306 is already in use
2. Run `mysqld --initialize --console` first
3. Check Windows Event Viewer for MySQL errors

### If you can't find MySQL:
1. Check if it's installed in Program Files
2. Add MySQL to your PATH environment variable
3. Restart PowerShell after installation

## 📱 Alternative: Use MySQL Workbench
MySQL Workbench is also installed - you can use it to:
- Connect to your local MySQL
- Create databases and users
- Manage your database visually

## ✅ After Setup:
Once MySQL is running locally, run:
```bash
npm run db:test
npm run db:generate
npx prisma db push
npm run dev
```






