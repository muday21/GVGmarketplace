const { PrismaClient } = require('@prisma/client');

async function testPrismaConnection() {
  console.log('🔄 Testing Prisma connection with wildcard access...');
  
  const prisma = new PrismaClient();
  
  try {
    console.log('🔄 Attempting to connect...');
    
    // Test basic connection
    await prisma.$connect();
    console.log('✅ Prisma connection successful!');
    
    // Test a simple query
    const userCount = await prisma.user.count();
    console.log(`📊 Found ${userCount} users in the database`);
    
    // Test creating a test user
    const testUser = await prisma.user.create({
      data: {
        name: 'Test User',
        email: `test-${Date.now()}@example.com`,
        role: 'BUYER'
      }
    });
    console.log('✅ Test user created successfully:', testUser.id);
    
    // Clean up - delete the test user
    await prisma.user.delete({
      where: { id: testUser.id }
    });
    console.log('🧹 Test user cleaned up');
    
    console.log('\n🎉 Prisma database connection test completed successfully!');
    
  } catch (error) {
    console.error('❌ Prisma connection failed:');
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    
    if (error.code === 'P1001') {
      console.log('\n💡 Possible solutions:');
      console.log('1. Check if the database server is running');
      console.log('2. Verify the IP address and port');
      console.log('3. Check if the database credentials are correct');
      console.log('4. Ensure the database exists');
      console.log('5. Verify wildcard access (%) is properly configured');
    }
  } finally {
    await prisma.$disconnect();
  }
}

testPrismaConnection();



