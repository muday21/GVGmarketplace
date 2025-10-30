# 🎯 Your cPanel Database Setup

## ✅ Database Credentials Configured:
- **Username**: `greenvbw_greenvb`
- **Database**: `greenvbw_greenblockchainproject`
- **Password**: `xQV=,{cfej{AgHtN`

## 🔧 Next Steps:

### 1. Find Your cPanel Host
You need to replace `YOUR_CPANEL_HOST` in your `.env` file with your actual cPanel host. This is usually:
- Your domain name (e.g., `yourdomain.com`)
- Your server IP address
- Or a subdomain provided by your hosting provider

### 2. Update the .env File
Edit your `.env` file and replace `YOUR_CPANEL_HOST` with your actual host:

```bash
# Example formats:
DATABASE_URL="mysql://greenvbw_greenvb:xQV=,{cfej{AgHtN@yourdomain.com:3306/greenvbw_greenblockchainproject"
# OR
DATABASE_URL="mysql://greenvbw_greenvb:xQV=,{cfej{AgHtN@123.456.789.012:3306/greenvbw_greenblockchainproject"
```

### 3. Enable Remote MySQL in cPanel
1. Log into your cPanel
2. Go to **MySQL Databases** section
3. Look for **Remote MySQL** or **Access Hosts**
4. Add your local IP address to allow connections
5. You can find your IP at: https://whatismyipaddress.com/

### 4. Test the Connection
Once you've updated the host, run:
```bash
npm run db:test
```

### 5. Generate Prisma Client
```bash
npm run db:generate
```

### 6. Sync Database Schema
```bash
npx prisma db push
```

### 7. Start Development
```bash
npm run dev
```

## 🔍 Finding Your cPanel Host

**Option 1: Check your hosting provider's documentation**
- Look for "Remote Database Access" or "External Database Connection" info

**Option 2: Check cPanel**
- In cPanel, look for "Remote MySQL" section
- It usually shows the hostname there

**Option 3: Contact your hosting provider**
- Ask them for the external MySQL hostname

## 🚨 Common Issues & Solutions

### Connection Refused
- Make sure "Remote MySQL" is enabled in cPanel
- Add your IP to the allowed hosts list
- Check if your hosting provider blocks external connections

### Access Denied
- Double-check username and password
- Ensure the database user has proper permissions
- Verify the database name is correct

### SSL Issues
If you get SSL errors, try adding SSL parameters:
```
DATABASE_URL="mysql://greenvbw_greenvb:xQV=,{cfej{AgHtN@yourhost:3306/greenvbw_greenblockchainproject?sslmode=require"
```

## 📞 Need Help?
If you can't find your cPanel host, please provide:
1. Your domain name
2. Your hosting provider name
3. Any error messages you see when testing

I can help you troubleshoot further!






