import mysql from 'mysql2/promise';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function testConnectionWithDifferentConfigs() {
  console.log('🔍 Testing Database Connection with Different Configurations...\n');
  
  const baseConfig = {
    user: 'greenvbw_greenvb',
    password: 'xQV=,{cfej{AgHtN',
    database: 'greenvbw_greenblockchainproject'
  };

  const testConfigs = [
    {
      name: 'Domain (greenvaluegroup.com)',
      host: 'greenvaluegroup.com',
      port: 3306
    },
    {
      name: 'Domain with SSL',
      host: 'greenvaluegroup.com',
      port: 3306,
      ssl: { rejectUnauthorized: false }
    },
    {
      name: 'Domain with different port (3307)',
      host: 'greenvaluegroup.com',
      port: 3307
    },
    {
      name: 'Domain with different port (3308)',
      host: 'greenvaluegroup.com',
      port: 3308
    }
  ];

  for (const config of testConfigs) {
    console.log(`\n🧪 Testing: ${config.name}`);
    console.log(`📡 Host: ${config.host}:${config.port}`);
    
    try {
      const connection = await mysql.createConnection({
        ...baseConfig,
        ...config,
        connectTimeout: 10000, // 10 seconds timeout
        acquireTimeout: 10000
      });

      console.log('✅ Connection successful!');
      
      // Test a simple query
      const [rows] = await connection.execute('SELECT VERSION() as version');
      console.log('📊 MySQL Version:', (rows as any)[0].version);
      
      await connection.end();
      
      // If this works, update the .env file
      console.log('🎉 Found working configuration!');
      return config;
      
    } catch (error: any) {
      console.log('❌ Connection failed:', error.message);
      
      if (error.code === 'ETIMEDOUT') {
        console.log('   → Connection timeout - check firewall/network');
      } else if (error.code === 'ECONNREFUSED') {
        console.log('   → Connection refused - check port/host');
      } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
        console.log('   → Access denied - check credentials');
      }
    }
  }
  
  return null;
}

async function checkNetworkConnectivity() {
  console.log('\n🌐 Checking Network Connectivity...');
  
  const hosts = ['greenvaluegroup.com'];
  const ports = [3306, 3307, 3308];
  
  for (const host of hosts) {
    for (const port of ports) {
      try {
        const net = require('net');
        const socket = new net.Socket();
        
        await new Promise((resolve, reject) => {
          socket.setTimeout(5000);
          socket.connect(port, host, () => {
            console.log(`✅ ${host}:${port} - Port is open`);
            socket.destroy();
            resolve(true);
          });
          
          socket.on('error', (err) => {
            console.log(`❌ ${host}:${port} - ${err.message}`);
            socket.destroy();
            reject(err);
          });
          
          socket.on('timeout', () => {
            console.log(`⏰ ${host}:${port} - Connection timeout`);
            socket.destroy();
            reject(new Error('Timeout'));
          });
        });
        
      } catch (error) {
        // Port is closed or unreachable
      }
    }
  }
}

async function main() {
  console.log('🚀 Comprehensive Database Connection Test\n');
  
  // Check network connectivity first
  await checkNetworkConnectivity();
  
  // Test different database configurations
  const workingConfig = await testConnectionWithDifferentConfigs();
  
  if (workingConfig) {
    console.log('\n🎯 RECOMMENDED SOLUTION:');
    console.log('Update your .env file with this working configuration:');
    console.log(`DATABASE_URL="mysql://greenvbw_greenvb:xQV=,{cfej{AgHtN@${workingConfig.host}:${workingConfig.port}/greenvbw_greenblockchainproject"`);
  } else {
    console.log('\n🔧 TROUBLESHOOTING STEPS:');
    console.log('1. Verify Remote MySQL is enabled in cPanel');
    console.log('2. Check that your IP addresses are added to Remote MySQL access:');
    console.log('   - 196.190.62.100');
    console.log('   - 151.115.98.15');
    console.log('3. Contact your hosting provider to confirm:');
    console.log('   - MySQL port (usually 3306)');
    console.log('   - External database access is allowed');
    console.log('   - Firewall settings');
    console.log('4. Try connecting from a different network');
    console.log('5. Check if your hosting provider requires SSL');
  }
  
  console.log('\n📞 If issues persist, contact your hosting provider with:');
  console.log('- Domain: greenvaluegroup.com');
  console.log('- Database: greenvbw_greenblockchainproject');
  console.log('- User: greenvbw_greenvb');
  console.log('- Your local IP addresses: 196.190.62.100, 151.115.98.15');
}

main().catch(console.error);






