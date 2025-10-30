# MySQL Setup Instructions

## 🎯 **MySQL Found!**
**Installation Path:** `C:\Program Files\MySQL\MySQL Server 8.4\bin\`

## 🔧 **Next Steps (Run as Administrator):**

### **Step 1: Open PowerShell as Administrator**
1. Press `Win + X`
2. Select "Windows PowerShell (Admin)" or "Terminal (Admin)"

### **Step 2: Add MySQL to PATH**
```powershell
$mysqlPath = "C:\Program Files\MySQL\MySQL Server 8.4\bin"
$currentPath = [Environment]::GetEnvironmentVariable("Path", "Machine")
if ($currentPath -notlike "*$mysqlPath*") {
    $newPath = $currentPath + ";" + $mysqlPath
    [Environment]::SetEnvironmentVariable("Path", $newPath, "Machine")
    Write-Host "✅ MySQL added to PATH!" -ForegroundColor Green
}
```

### **Step 3: Initialize MySQL**
```powershell
mysqld --initialize --console
```
**Important:** This will show a temporary root password - **SAVE IT!**

### **Step 4: Start MySQL Service**
```powershell
net start mysql84
```

### **Step 5: Connect and Setup**
```powershell
mysql -u root -p
```
Use the temporary password from Step 3.

### **Step 6: In MySQL Prompt, Run:**
```sql
ALTER USER 'root'@'localhost' IDENTIFIED BY 'your_new_password';
CREATE DATABASE greenvbw_greenblockchainproject;
CREATE USER 'greenvbw_greenvb'@'localhost' IDENTIFIED BY 'xQV=,{cfej{AgHtN';
GRANT ALL PRIVILEGES ON greenvbw_greenblockchainproject.* TO 'greenvbw_greenvb'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### **Step 7: Update .env File**
Update your `.env` file with:
```
DATABASE_URL="mysql://greenvbw_greenvb:xQV=,{cfej{AgHtN@localhost:3306/greenvbw_greenblockchainproject"
```

## 🚀 **Alternative: Use MySQL Workbench**
If command line is too complex:
1. Open **MySQL Workbench**
2. Connect to local MySQL
3. Create database and user through the GUI

## ✅ **After Setup:**
```bash
npm run db:test
npm run db:generate
npx prisma db push
npm run dev
```






