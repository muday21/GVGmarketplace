# 🚀 Quick Start - Deploy to cPanel

## ✅ What's Already Done:
- ✅ GitHub Actions workflow created (`.github/workflows/cpanel-deploy.yml`)
- ✅ FTP server configured: `ftp.greeninvestmentgroups.com`
- ✅ Deploy path set: `/home/greenifv/gvgmarketplace.greeninvestmentgroups.com/`
- ✅ Build process configured

---

## 📋 What You Need To Do Now:

### Step 1: Add GitHub Secrets (5 minutes)
1. Go to your GitHub repo → **Settings** → **Secrets and variables** → **Actions**
2. Click **"New repository secret"** for each:

**Required Secrets:**
- `FTP_USERNAME` - Your cPanel FTP username
- `FTP_PASSWORD` - Your cPanel FTP password
- `DATABASE_URL` - `mysql://user:pass@localhost:3306/dbname`
- `BETTER_AUTH_SECRET` - (copy from your .env file)
- `BETTER_AUTH_URL` - `https://gvgmarketplace.greeninvestmentgroups.com`
- `SMTP_HOST` - `sandbox.smtp.mailtrap.io`
- `SMTP_PORT` - `587`
- `SMTP_USER` - `67b625e2b6ab46`
- `SMTP_PASS` - `c011de1b70a404`
- `EMAIL_FROM` - `verify@gvgmarketplace.greeninvestmentgroups.com`
- `SECURE` - `false`

📄 See `.github/SECRETS_TEMPLATE.md` for detailed instructions

---

### Step 2: Setup Database in cPanel (3 minutes)
1. Login to cPanel
2. Go to **"MySQL Databases"**
3. Create new database: `greenifv_gvgdb` (or your preferred name)
4. Create database user with strong password
5. Add user to database with **ALL PRIVILEGES**
6. Update `DATABASE_URL` secret in GitHub with these credentials

---

### Step 3: Setup Node.js App in cPanel (5 minutes)
1. In cPanel, go to **"Setup Node.js App"**
2. Click **"Create Application"**
3. Fill in:
   - **Node.js version**: `20.x`
   - **Application mode**: `Production`
   - **Application root**: `/home/greenifv/gvgmarketplace.greeninvestmentgroups.com`
   - **Application URL**: `https://gvgmarketplace.greeninvestmentgroups.com`
   - **Application startup file**: `node_modules/next/dist/bin/next`
4. Click **"Create"**

---

### Step 4: Deploy Your Application (2 minutes)
1. Commit and push to `main` branch:
   ```bash
   git add .
   git commit -m "Setup cPanel deployment"
   git push origin main
   ```
2. Go to GitHub → **Actions** tab
3. Watch the deployment progress
4. Wait for ✅ green checkmark

---

### Step 5: Run Database Migrations (2 minutes)
After first deployment, in cPanel Terminal or SSH:
```bash
cd /home/greenifv/gvgmarketplace.greeninvestmentgroups.com
npx prisma migrate deploy
npx prisma generate
```

---

### Step 6: Start Your Application (1 minute)
1. In cPanel, go to **"Setup Node.js App"**
2. Find your application
3. Click **"Start"** or **"Restart"**
4. Visit: https://gvgmarketplace.greeninvestmentgroups.com

---

## 🎉 Done!

Your application should now be live at:
**https://gvgmarketplace.greeninvestmentgroups.com**

---

## 🔄 Future Deployments:

Just push to main branch:
```bash
git add .
git commit -m "Your changes"
git push origin main
```

GitHub Actions will automatically:
1. Build your app
2. Deploy to cPanel
3. Notify you of success/failure

---

## 🆘 Need Help?

See `DEPLOYMENT_GUIDE.md` for detailed troubleshooting and configuration.

---

## ⏱️ Total Setup Time: ~20 minutes
