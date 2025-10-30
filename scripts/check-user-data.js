const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function checkAndFixUserData() {
  try {
    console.log('🔍 Checking user data...')
    
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: 'beka@gmail.com' }
    })
    
    console.log('👤 User found:', user)
    
    if (user) {
      // If user exists but has no name, update it
      if (!user.name || user.name === '') {
        console.log('⚠️ User has no name, updating...')
        const updatedUser = await prisma.user.update({
          where: { id: user.id },
          data: { name: 'Beka' }
        })
        console.log('✅ User updated:', updatedUser)
      } else {
        console.log('✅ User already has name:', user.name)
      }
    } else {
      console.log('❌ User not found')
    }
    
    // List all users
    const allUsers = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true }
    })
    console.log('📋 All users:', allUsers)
    
  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkAndFixUserData()
