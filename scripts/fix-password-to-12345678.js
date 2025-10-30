const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function updatePasswordToCorrectOne() {
  try {
    console.log('🔍 Updating password to 12345678 for berekettade7@gmail.com...')
    
    // Delete the existing user and account to start fresh
    await prisma.account.deleteMany({
      where: { userId: 'cmhb2k0u70000u05cu3bfyjx3' }
    })
    
    await prisma.user.delete({
      where: { id: 'cmhb2k0u70000u05cu3bfyjx3' }
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
    
    // Create account with the correct password (let Better Auth handle hashing)
    const account = await prisma.account.create({
      data: {
        userId: user.id,
        accountId: user.email,
        providerId: 'credential',
        password: '12345678' // Correct password
      }
    })
    
    console.log('✅ Account created with correct password:', account)
    
  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

updatePasswordToCorrectOne()

