const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function deleteAndRecreateUser() {
  try {
    console.log('🔍 Deleting existing user and account...')
    
    // Delete existing user and account
    await prisma.account.deleteMany({
      where: { userId: 'cmhb2fez50000u080amom1dh1' }
    })
    
    await prisma.user.delete({
      where: { id: 'cmhb2fez50000u080amom1dh1' }
    })
    
    console.log('🗑️ Deleted existing user and account')
    
    // Create new user without password - let Better Auth handle it
    const user = await prisma.user.create({
      data: {
        email: 'berekettade7@gmail.com',
        name: 'bereket',
        role: 'BUYER'
      }
    })
    
    console.log('✅ New user created:', user)
    console.log('📝 Now use the sign-up API to create the account with proper password hashing')
    
  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

deleteAndRecreateUser()

