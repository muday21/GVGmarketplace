import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function testAlternativeConnections() {
  console.log('🔍 Testing Alternative Connection Methods...\n');
  
  const baseConfig = {
    user: 'greenvbw_greenvb',
    password: 'xQV=,{cfej{AgHtN',
    database: 'greenvbw_greenblockchainproject'
  };

  // Test different connection configurations
  const testConfigs = [
    {
      name: 'Direct IP Connection',
      host: '69.72.248.158', // Resolved IP
      port: 3306
    },
    {
      name: 'Domain with SSL',
      host: 'greenvaluegroup.com',
      port: 3306,
      ssl: { rejectUnauthorized: false }
    },
    {
      name: 'Domain with SSL and timeout',
      host: 'greenvaluegroup.com',
      port: 3306,
      ssl: { rejectUnauthorized: false },
      connectTimeout: 30000,
      acquireTimeout: 30000
    },
    {
      name: 'Domain with different timeout settings',
      host: 'greenvaluegroup.com',
      port: 3306,
      connectTimeout: 60000,
      acquireTimeout: 60000
    }
  ];

  for (const config of testConfigs) {
    console.log(`\n🧪 Testing: ${config.name}`);
    console.log(`📡 Host: ${config.host}:${config.port}`);
    
    try {
      const connection = await mysql.createConnection({
        ...baseConfig,
        ...config
      });

      console.log('✅ Connection successful!');
      
      // Test a simple query
      const [rows] = await connection.execute('SELECT VERSION() as version');
      console.log('📊 MySQL Version:', (rows as any)[0].version);
      
      await connection.end();
      
      console.log('🎉 Found working configuration!');
      console.log(`Update your .env file with: DATABASE_URL="mysql://greenvbw_greenvb:xQV=,{cfej{AgHtN@${config.host}:${config.port}/greenvbw_greenblockchainproject"`);
      return config;
      
    } catch (error: any) {
      console.log('❌ Connection failed:', error.message);
      
      if (error.code === 'ETIMEDOUT') {
        console.log('   → Server firewall is blocking the connection');
      } else if (error.code === 'ECONNREFUSED') {
        console.log('   → Port is closed or service not running');
      } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
        console.log('   → Credentials issue - check username/password');
      }
    }
  }
  
  return null;
}

async function main() {
  console.log('🚀 Alternative Connection Test\n');
  console.log('Domain: greenvaluegroup.com');
  console.log('Resolved IP: 69.72.248.158');
  console.log('Issue: Server firewall blocking external connections\n');
  
  const workingConfig = await testAlternativeConnections();
  
  if (!workingConfig) {
    console.log('\n🔧 NEXT STEPS:');
    console.log('1. Contact your hosting provider about server firewall');
    console.log('2. Ask them to enable external MySQL connections');
    console.log('3. Verify Remote MySQL is properly configured');
    console.log('4. Check if they use a different port for external access');
    console.log('\n📞 Hosting provider should check:');
    console.log('- Server firewall rules');
    console.log('- MySQL bind-address configuration');
    console.log('- Port 3306 accessibility');
    console.log('- Remote MySQL user permissions');
  }
}

main().catch(console.error);






