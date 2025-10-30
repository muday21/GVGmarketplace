const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function fixPasswordHash() {
  try {
    console.log('🔍 Fixing password hash for berekettade7@gmail.com...')
    
    // Generate proper bcrypt hash for password "password"
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash('password', saltRounds)
    
    console.log('🔐 Generated hash:', hashedPassword)
    
    // Update the account with the correct password hash
    const account = await prisma.account.updateMany({
      where: { 
        userId: 'eZ4pIachpWKPUrxBRQzkwMWJS7C6gMUW',
        providerId: 'credential'
      },
      data: {
        password: hashedPassword
      }
    })
    
    console.log('✅ Password hash updated:', account)
    
  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

fixPasswordHash()

