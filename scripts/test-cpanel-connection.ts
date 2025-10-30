import mysql from 'mysql2/promise';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function testMySQLConnection() {
  console.log('🔍 Testing MySQL Connection...');
  
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL not found in environment variables');
    console.log('Please create a .env file with your database credentials');
    return;
  }

  try {
    // Parse DATABASE_URL
    const url = new URL(process.env.DATABASE_URL);
    const config = {
      host: url.hostname,
      port: parseInt(url.port) || 3306,
      user: url.username,
      password: url.password,
      database: url.pathname.slice(1), // Remove leading slash
      ssl: url.searchParams.get('sslmode') === 'require' ? { rejectUnauthorized: false } : false
    };

    console.log(`📡 Connecting to: ${config.host}:${config.port}`);
    console.log(`🗄️  Database: ${config.database}`);
    console.log(`👤 User: ${config.user}`);

    // Test raw MySQL connection
    const connection = await mysql.createConnection(config);
    console.log('✅ Raw MySQL connection successful!');

    // Test a simple query
    const [rows] = await connection.execute('SELECT VERSION() as version');
    console.log('📊 MySQL Version:', (rows as any)[0].version);

    await connection.end();

    // Test Prisma connection
    console.log('\n🔍 Testing Prisma Connection...');
    const prisma = new PrismaClient();
    
    // Test Prisma connection with a simple query
    await prisma.$queryRaw`SELECT 1 as test`;
    console.log('✅ Prisma connection successful!');

    await prisma.$disconnect();
    console.log('\n🎉 All database connections are working!');

  } catch (error) {
    console.error('❌ Database connection failed:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('ECONNREFUSED')) {
        console.log('\n💡 Troubleshooting tips:');
        console.log('- Check if your cPanel host allows remote connections');
        console.log('- Verify the host and port are correct');
        console.log('- Ensure your IP is whitelisted in cPanel');
      } else if (error.message.includes('Access denied')) {
        console.log('\n💡 Troubleshooting tips:');
        console.log('- Check your username and password');
        console.log('- Verify the database name exists');
        console.log('- Ensure the user has proper permissions');
      } else if (error.message.includes('SSL')) {
        console.log('\n💡 Troubleshooting tips:');
        console.log('- Try adding ?sslmode=require to your DATABASE_URL');
        console.log('- Or try ?sslmode=disable if SSL is not required');
      }
    }
  }
}

async function testPrismaSchema() {
  console.log('\n🔍 Testing Prisma Schema...');
  
  try {
    const prisma = new PrismaClient();
    
    // Check if tables exist
    const tables = await prisma.$queryRaw`
      SELECT TABLE_NAME 
      FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_SCHEMA = DATABASE()
    `;
    
    console.log('📋 Existing tables:', (tables as any).map((t: any) => t.TABLE_NAME));
    
    await prisma.$disconnect();
    
  } catch (error) {
    console.error('❌ Schema test failed:', error);
  }
}

// Main execution
async function main() {
  console.log('🚀 Starting Database Connection Tests\n');
  
  await testMySQLConnection();
  await testPrismaSchema();
  
  console.log('\n📝 Next steps:');
  console.log('1. If connection failed, check your .env file');
  console.log('2. Run: npm run db:generate (to generate Prisma client)');
  console.log('3. Run: npx prisma db push (to sync schema with database)');
  console.log('4. Run: npm run dev (to start your application)');
}

main().catch(console.error);






