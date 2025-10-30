const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function createNewUser() {
  try {
    console.log('🔍 Creating a fresh user with proper Better Auth format...')
    
    // Delete existing user and account
    await prisma.account.deleteMany({
      where: { userId: 'eZ4pIachpWKPUrxBRQzkwMWJS7C6gMUW' }
    })
    
    await prisma.user.delete({
      where: { id: 'eZ4pIachpWKPUrxBRQzkwMWJS7C6gMUW' }
    })
    
    console.log('🗑️ Deleted existing user and account')
    
    // Create new user
    const user = await prisma.user.create({
      data: {
        email: 'berekettade7@gmail.com',
        name: 'bereket',
        role: 'BUYER'
      }
    })
    
    console.log('✅ New user created:', user)
    
    // Create account with simple password (Better Auth will handle hashing)
    const account = await prisma.account.create({
      data: {
        userId: user.id,
        accountId: user.email,
        providerId: 'credential',
        password: 'password' // Let Better Auth handle the hashing
      }
    })
    
    console.log('✅ New account created:', account)
    
  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createNewUser()

