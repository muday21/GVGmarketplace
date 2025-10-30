const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function resetUserPassword() {
  try {
    console.log('🔍 Resetting password for berekettade7@gmail.com...')
    
    // Update the account password to the correct format
    const account = await prisma.account.updateMany({
      where: { 
        userId: 'eZ4pIachpWKPUrxBRQzkwMWJS7C6gMUW',
        providerId: 'credential'
      },
      data: {
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' // password
      }
    })
    
    console.log('✅ Password updated:', account)
    
    // Also update accountId to match email
    const account2 = await prisma.account.updateMany({
      where: { 
        userId: 'eZ4pIachpWKPUrxBRQzkwMWJS7C6gMUW',
        providerId: 'credential'
      },
      data: {
        accountId: 'berekettade7@gmail.com'
      }
    })
    
    console.log('✅ Account ID updated:', account2)
    
  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

resetUserPassword()

