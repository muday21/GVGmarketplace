# cPanel Deployment Guide

## ✅ Deployment Setup Complete!

Your GitHub Actions workflow is now configured to automatically deploy to cPanel.

---

## 📋 Required GitHub Secrets

You need to add these secrets to your GitHub repository:

### How to Add GitHub Secrets:
1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each secret below:

### FTP Credentials:
- **FTP_USERNAME**: Your cPanel FTP username
- **FTP_PASSWORD**: Your cPanel FTP password

### Database Configuration:
- **DATABASE_URL**: `mysql://username:password@host:3306/database_name`
  - Example: `mysql://greenifv_user:yourpassword@localhost:3306/greenifv_gvgdb`

### Better Auth Configuration:
- **BETTER_AUTH_SECRET**: Your auth secret key (from your current .env file)
- **BETTER_AUTH_URL**: `https://gvgmarketplace.greeninvestmentgroups.com`

### Email/SMTP Configuration:
- **SMTP_HOST**: `sandbox.smtp.mailtrap.io`
- **SMTP_PORT**: `587`
- **SMTP_USER**: `67b625e2b6ab46`
- **SMTP_PASS**: `c011de1b70a404`
- **EMAIL_FROM**: `verify@gvgmarketplace.greeninvestmentgroups.com`
- **SECURE**: `false`

---

## 🚀 How Deployment Works

### Automatic Deployment:
- Every time you push to the `main` branch, GitHub Actions will:
  1. Build your Next.js application
  2. Create a production build
  3. Upload files to your cPanel server via FTP
  4. Deploy to: `https://gvgmarketplace.greeninvestmentgroups.com`

### Manual Deployment:
- Go to **Actions** tab in GitHub
- Select **Deploy to cPanel** workflow
- Click **Run workflow** → **Run workflow**

---

## 📁 Server Configuration

### FTP Details:
- **Server**: ftp.greeninvestmentgroups.com
- **Port**: 21
- **Directory**: /home/greenifv/gvgmarketplace.greeninvestmentgroups.com/

### Files Deployed:
- `.next/` - Built application
- `public/` - Static assets
- `node_modules/` - Dependencies
- `package.json` - Package configuration
- `.env` - Environment variables
- `prisma/` - Database schema

---

## ⚙️ cPanel Setup Required

### 1. Setup Node.js Application in cPanel:
1. Login to cPanel
2. Go to **"Setup Node.js App"**
3. Click **"Create Application"**
4. Configure:
   - **Node.js version**: 20.x or 18.x
   - **Application mode**: Production
   - **Application root**: `/home/greenifv/gvgmarketplace.greeninvestmentgroups.com`
   - **Application URL**: `https://gvgmarketplace.greeninvestmentgroups.com`
   - **Application startup file**: `node_modules/next/dist/bin/next`
   - **Application startup command**: `start`

### 2. Setup Database:
1. Go to **MySQL Databases** in cPanel
2. Create a new database (e.g., `greenifv_gvgdb`)
3. Create a database user
4. Add user to database with ALL PRIVILEGES
5. Update your `DATABASE_URL` secret in GitHub

### 3. Run Database Migrations:
After first deployment, SSH into your server or use cPanel Terminal:
```bash
cd /home/greenifv/gvgmarketplace.greeninvestmentgroups.com
npx prisma migrate deploy
npx prisma generate
```

---

## 🔧 Troubleshooting

### Deployment Fails:
- Check GitHub Actions logs for errors
- Verify all secrets are added correctly
- Ensure FTP credentials are correct

### Application Not Starting:
- Check Node.js app status in cPanel
- Restart the application
- Check error logs in cPanel

### Database Connection Issues:
- Verify DATABASE_URL is correct
- Check database user has proper permissions
- Ensure database exists

### Email Not Sending:
- For production, replace Mailtrap with real SMTP (Gmail, SendGrid, etc.)
- Update SMTP secrets in GitHub

---

## 📝 Next Steps

1. **Add all GitHub Secrets** (see list above)
2. **Setup Node.js App in cPanel**
3. **Create and configure database**
4. **Push to main branch** to trigger first deployment
5. **Run database migrations** via SSH/Terminal
6. **Test your application** at https://gvgmarketplace.greeninvestmentgroups.com

---

## 🔐 Security Notes

- Never commit `.env` files to Git
- Keep GitHub Secrets secure
- Use strong passwords for FTP and database
- Enable SSL/HTTPS in cPanel (Let's Encrypt)
- For production, use real email service (not Mailtrap)

---

## 📞 Support

If you encounter issues:
1. Check GitHub Actions logs
2. Check cPanel error logs
3. Verify all configurations match this guide
4. Ensure Node.js app is running in cPanel
