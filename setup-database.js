const { PrismaClient } = require('@prisma/client');

async function setupDatabase() {
  console.log('🔄 Setting up database with Prisma...');
  
  const prisma = new PrismaClient();
  
  try {
    console.log('🔄 Testing connection...');
    
    // Test basic connection
    await prisma.$connect();
    console.log('✅ Database connection successful!');
    
    // Check current tables
    const userCount = await prisma.user.count();
    console.log(`📊 Current users in database: ${userCount}`);
    
    // Create a test user if none exist
    if (userCount === 0) {
      console.log('🔄 Creating test user...');
      const testUser = await prisma.user.create({
        data: {
          name: 'Admin User',
          email: 'admin@gvgmarketplace.com',
          role: 'ADMIN',
          emailVerified: true
        }
      });
      console.log('✅ Test user created:', testUser.email);
    }
    
    // Create a test producer user
    const producerUser = await prisma.user.create({
      data: {
        name: 'Producer User',
        email: 'producer@example.com',
        role: 'PRODUCER',
        emailVerified: true
      }
    }).catch(() => {
      console.log('ℹ️ Producer user already exists');
    });
    
    // Create a test buyer user
    const buyerUser = await prisma.user.create({
      data: {
        name: 'Buyer User',
        email: 'buyer@example.com',
        role: 'BUYER',
        emailVerified: true
      }
    }).catch(() => {
      console.log('ℹ️ Buyer user already exists');
    });
    
    // Check final counts
    const finalUserCount = await prisma.user.count();
    console.log(`📊 Total users in database: ${finalUserCount}`);
    
    console.log('\n🎉 Database setup completed successfully!');
    console.log('📋 You can now use Prisma in your application');
    
  } catch (error) {
    console.error('❌ Database setup failed:');
    console.error('Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

setupDatabase();



