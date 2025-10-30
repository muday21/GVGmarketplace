# MySQL Local Setup Script
# Run this script as Administrator

Write-Host "🚀 Setting up MySQL locally..." -ForegroundColor Green

# Check if running as Administrator
if (-NOT ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
    Write-Host "❌ This script must be run as Administrator!" -ForegroundColor Red
    Write-Host "Right-click PowerShell and select 'Run as Administrator'" -ForegroundColor Yellow
    exit 1
}

# Function to check if MySQL is installed
function Test-MySQLInstallation {
    $mysqlPaths = @(
        "C:\Program Files\MySQL\MySQL Server 8.4\bin\mysqld.exe",
        "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqld.exe",
        "C:\Program Files (x86)\MySQL\MySQL Server 8.4\bin\mysqld.exe",
        "C:\Program Files (x86)\MySQL\MySQL Server 8.0\bin\mysqld.exe"
    )
    
    foreach ($path in $mysqlPaths) {
        if (Test-Path $path) {
            return $path
        }
    }
    return $null
}

# Find MySQL installation
$mysqlPath = Test-MySQLInstallation
if (-not $mysqlPath) {
    Write-Host "❌ MySQL not found in standard locations" -ForegroundColor Red
    Write-Host "Please check if MySQL is properly installed" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Found MySQL at: $mysqlPath" -ForegroundColor Green

# Check if MySQL service exists
$mysqlService = Get-Service | Where-Object {$_.Name -like "*mysql*"}
if (-not $mysqlService) {
    Write-Host "🔧 MySQL service not found. Let's initialize it..." -ForegroundColor Yellow
    
    # Initialize MySQL
    Write-Host "Initializing MySQL..." -ForegroundColor Yellow
    try {
        & $mysqlPath --initialize --console
        Write-Host "✅ MySQL initialized successfully!" -ForegroundColor Green
    } catch {
        Write-Host "❌ Failed to initialize MySQL: $($_.Exception.Message)" -ForegroundColor Red
        exit 1
    }
}

# Start MySQL service
Write-Host "🚀 Starting MySQL service..." -ForegroundColor Yellow
try {
    $serviceName = (Get-Service | Where-Object {$_.Name -like "*mysql*"}).Name
    if ($serviceName) {
        Start-Service $serviceName
        Write-Host "✅ MySQL service started!" -ForegroundColor Green
    } else {
        Write-Host "❌ Could not find MySQL service" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "❌ Failed to start MySQL service: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Test connection
Write-Host "🧪 Testing MySQL connection..." -ForegroundColor Yellow
try {
    $mysqlExe = $mysqlPath -replace "mysqld.exe", "mysql.exe"
    if (Test-Path $mysqlExe) {
        Write-Host "✅ MySQL is ready!" -ForegroundColor Green
        Write-Host ""
        Write-Host "📝 Next steps:" -ForegroundColor Cyan
        Write-Host "1. Connect to MySQL: $mysqlExe -u root -p" -ForegroundColor White
        Write-Host "2. Set root password: ALTER USER 'root'@'localhost' IDENTIFIED BY 'your_password';" -ForegroundColor White
        Write-Host "3. Create database: CREATE DATABASE greenvbw_greenblockchainproject;" -ForegroundColor White
        Write-Host "4. Create user: CREATE USER 'greenvbw_greenvb'@'localhost' IDENTIFIED BY 'xQV=,{cfej{AgHtN';" -ForegroundColor White
        Write-Host "5. Grant privileges: GRANT ALL PRIVILEGES ON greenvbw_greenblockchainproject.* TO 'greenvbw_greenvb'@'localhost';" -ForegroundColor White
        Write-Host "6. Update .env file with local connection" -ForegroundColor White
    } else {
        Write-Host "❌ MySQL client not found" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Failed to test MySQL connection: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "🎉 MySQL setup complete! Check MYSQL_LOCAL_SETUP.md for detailed instructions." -ForegroundColor Green






