# GitHub Secrets Setup Template

Copy this template and fill in your actual values, then add them to GitHub Secrets.

## How to Add Secrets to GitHub:
1. Go to: https://github.com/YOUR_USERNAME/YOUR_REPO/settings/secrets/actions
2. Click "New repository secret"
3. Copy the name and paste your value
4. Click "Add secret"

---

## Required Secrets:

### FTP Configuration
```
Name: FTP_USERNAME
Value: [Your cPanel FTP username]
```

```
Name: FTP_PASSWORD
Value: [Your cPanel FTP password]
```

---

### Database Configuration
```
Name: DATABASE_URL
Value: mysql://[db_user]:[db_password]@localhost:3306/[db_name]
Example: mysql://greenifv_user:mypassword123@localhost:3306/greenifv_gvgdb
```

---

### Better Auth Configuration
```
Name: BETTER_AUTH_SECRET
Value: [Copy from your current .env file]
Current value in .env: f9d079d83f9f817e24566bbf45aa8daa6f4f6a2558ecc0d63743c9d18586a18b
```

```
Name: BETTER_AUTH_URL
Value: https://gvgmarketplace.greeninvestmentgroups.com
```

---

### SMTP Configuration (Mailtrap - Development)
```
Name: SMTP_HOST
Value: sandbox.smtp.mailtrap.io
```

```
Name: SMTP_PORT
Value: 587
```

```
Name: SMTP_USER
Value: 67b625e2b6ab46
```

```
Name: SMTP_PASS
Value: c011de1b70a404
```

```
Name: EMAIL_FROM
Value: verify@gvgmarketplace.greeninvestmentgroups.com
```

```
Name: SECURE
Value: false
```

---

## ⚠️ Important Notes:

1. **Never share these secrets publicly**
2. **For production email**, replace Mailtrap with:
   - Gmail SMTP
   - SendGrid
   - AWS SES
   - Mailgun
   
3. **Database credentials** should be created in cPanel MySQL Databases section

4. **After adding all secrets**, push to main branch to trigger deployment

---

## Verification Checklist:

- [ ] All 11 secrets added to GitHub
- [ ] FTP credentials tested and working
- [ ] Database created in cPanel
- [ ] Node.js app configured in cPanel
- [ ] SSL certificate installed (Let's Encrypt)
- [ ] First deployment successful
- [ ] Database migrations run
- [ ] Application accessible at https://gvgmarketplace.greeninvestmentgroups.com
