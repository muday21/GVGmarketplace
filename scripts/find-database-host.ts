import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// List of possible hosts to try
const possibleHosts = [
  'greenvaluegroup.com',
  'mysql.greenvaluegroup.com',
  'db.greenvaluegroup.com',
  'localhost.greenvaluegroup.com',
  // Add more if you know them
];

async function testHost(host: string) {
  console.log(`🔍 Testing host: ${host}`);
  
  const config = {
    host: host,
    port: 3306,
    user: 'greenvbw_greenvb',
    password: 'xQV=,{cfej{AgHtN',
    database: 'greenvbw_greenblockchainproject',
    connectTimeout: 10000, // 10 seconds timeout
  };

  try {
    const connection = await mysql.createConnection(config);
    console.log(`✅ SUCCESS! Connected to ${host}`);
    
    // Test a simple query
    const [rows] = await connection.execute('SELECT VERSION() as version');
    console.log(`📊 MySQL Version: ${(rows as any)[0].version}`);
    
    await connection.end();
    return true;
  } catch (error: any) {
    console.log(`❌ Failed to connect to ${host}: ${error.message}`);
    return false;
  }
}

async function main() {
  console.log('🚀 Testing different hosts for your cPanel database...\n');
  
  for (const host of possibleHosts) {
    const success = await testHost(host);
    if (success) {
      console.log(`\n🎉 Found working host: ${host}`);
      console.log(`\n📝 Update your .env file with:`);
      console.log(`DATABASE_URL="mysql://greenvbw_greenvb:xQV=,{cfej{AgHtN@${host}:3306/greenvbw_greenblockchainproject"`);
      return;
    }
    console.log(''); // Empty line for readability
  }
  
  console.log('❌ None of the tested hosts worked.');
  console.log('\n💡 Next steps:');
  console.log('1. Check your cPanel for the correct MySQL hostname');
  console.log('2. Look for "Remote MySQL" or "Database Access" section');
  console.log('3. Contact your hosting provider for the external MySQL hostname');
  console.log('4. The hostname might be something like: mysql.yourdomain.com or db.yourdomain.com');
}

main().catch(console.error);






