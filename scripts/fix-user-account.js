const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function checkAndFixUserAccount() {
  try {
    console.log('🔍 Checking user account for berekettade7@gmail.com...')
    
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: 'berekettade7@gmail.com' },
      include: { accounts: true }
    })
    
    console.log('👤 User found:', user)
    
    if (user) {
      console.log('📋 User accounts:', user.accounts)
      
      // Check if user has a credential account
      const credentialAccount = user.accounts.find(acc => acc.providerId === 'credential')
      
      if (!credentialAccount) {
        console.log('⚠️ No credential account found, creating one...')
        
        // Create credential account
        const account = await prisma.account.create({
          data: {
            userId: user.id,
            accountId: user.email,
            providerId: 'credential',
            password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' // password
          }
        })
        
        console.log('✅ Credential account created:', account)
      } else {
        console.log('✅ Credential account already exists:', credentialAccount)
      }
    } else {
      console.log('❌ User not found')
    }
    
  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkAndFixUserAccount()

