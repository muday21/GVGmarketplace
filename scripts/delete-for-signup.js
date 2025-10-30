const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function deleteUserForSignup() {
  try {
    console.log('🔍 Deleting user to allow fresh sign-up...')
    
    // Delete the existing user and account
    await prisma.account.deleteMany({
      where: { userId: 'cmhb2mlxm0000u0gs3t8zx8cn' }
    })
    
    await prisma.user.delete({
      where: { id: 'cmhb2mlxm0000u0gs3t8zx8cn' }
    })
    
    console.log('✅ User deleted. Now use the sign-up form in the browser.')
    console.log('📝 Go to: http://localhost:3000/auth/signup')
    console.log('📝 Use: berekettade7@gmail.com / 12345678')
    
  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

deleteUserForSignup()

