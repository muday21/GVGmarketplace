const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function createBekaUser() {
  try {
    console.log('🔍 Creating user beka@gmail.com...')
    
    // Create the user
    const user = await prisma.user.create({
      data: {
        email: 'beka@gmail.com',
        name: 'Beka',
        role: 'BUYER'
      }
    })
    
    console.log('✅ User created:', user)
    
    // Also create an account record for Better Auth
    const account = await prisma.account.create({
      data: {
        userId: user.id,
        accountId: user.email,
        providerId: 'credential',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' // password
      }
    })
    
    console.log('✅ Account created:', account)
    
  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createBekaUser()
