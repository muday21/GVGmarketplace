#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Setting up cPanel Database Connection...\n');

// Check if .env exists
if (!fs.existsSync('.env')) {
  console.log('📝 Creating .env file from template...');
  if (fs.existsSync('env.template')) {
    fs.copyFileSync('env.template', '.env');
    console.log('✅ .env file created! Please edit it with your cPanel credentials.\n');
  } else {
    console.log('❌ env.template not found. Please create .env manually.');
    process.exit(1);
  }
} else {
  console.log('✅ .env file already exists.\n');
}

// Check if DATABASE_URL is set
const envContent = fs.readFileSync('.env', 'utf8');
if (!envContent.includes('DATABASE_URL=') || envContent.includes('DATABASE_URL="mysql://username:password@host:port/database_name"')) {
  console.log('⚠️  Please update your .env file with actual cPanel database credentials before continuing.');
  console.log('   Edit the DATABASE_URL line with your real database connection string.\n');
}

console.log('🔧 Installing dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Dependencies installed!\n');
} catch (error) {
  console.error('❌ Failed to install dependencies:', error);
  process.exit(1);
}

console.log('🧪 Testing database connection...');
try {
  execSync('npm run db:test', { stdio: 'inherit' });
} catch (error) {
  console.log('❌ Database connection test failed. Please check your .env file.\n');
}

console.log('📦 Generating Prisma client...');
try {
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('✅ Prisma client generated!\n');
} catch (error) {
  console.error('❌ Failed to generate Prisma client:', error);
}

console.log('🎉 Setup complete! Next steps:');
console.log('1. Update your .env file with actual cPanel credentials');
console.log('2. Run: npm run db:test (to verify connection)');
console.log('3. Run: npx prisma db push (to sync schema)');
console.log('4. Run: npm run dev (to start development server)');
console.log('\n📖 For detailed instructions, see CPANEL_SETUP.md');






