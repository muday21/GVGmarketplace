const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function deleteUserByEmail(email) {
  try {
    console.log(`Deleting user: ${email}`);

    // First, find the user
    const user = await prisma.user.findUnique({
      where: { email: email },
      include: {
        accounts: true,
        sessions: true,
      }
    });

    if (!user) {
      console.log(`User ${email} not found`);
      return;
    }

    // Delete related records first
    if (user.accounts.length > 0) {
      await prisma.account.deleteMany({
        where: { userId: user.id }
      });
      console.log(`Deleted ${user.accounts.length} account(s) for ${email}`);
    }

    if (user.sessions.length > 0) {
      await prisma.session.deleteMany({
        where: { userId: user.id }
      });
      console.log(`Deleted ${user.sessions.length} session(s) for ${email}`);
    }

    // Delete the user
    await prisma.user.delete({
      where: { email: email }
    });

    console.log(`✅ Successfully deleted user: ${email}`);

  } catch (error) {
    console.error(`❌ Error deleting user ${email}:`, error);
  }
}

async function listAllUsers() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        emailVerified: true,
        createdAt: true,
        _count: {
          select: {
            accounts: true,
            sessions: true,
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    console.log('\n📋 Current Users in Database:');
    console.log('=====================================');
    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.email}`);
      console.log(`   Name: ${user.name || 'N/A'}`);
      console.log(`   Role: ${user.role}`);
      console.log(`   Verified: ${user.emailVerified ? '✅' : '❌'}`);
      console.log(`   Created: ${user.createdAt.toISOString()}`);
      console.log(`   Accounts: ${user._count.accounts}, Sessions: ${user._count.sessions}`);
      console.log('');
    });

  } catch (error) {
    console.error('Error listing users:', error);
  }
}

async function main() {
  const command = process.argv[2];
  const email = process.argv[3];

  if (command === 'list') {
    await listAllUsers();
  } else if (command === 'delete' && email) {
    await deleteUserByEmail(email);
  } else if (command === 'delete-duplicates') {
    // Delete the duplicate users we saw in the logs
    await deleteUserByEmail('bekatade792@gmail.com');
    await deleteUserByEmail('bekitad9@gmail.com');
  } else {
    console.log('Usage:');
    console.log('  node delete-users.js list                    # List all users');
    console.log('  node delete-users.js delete <email>          # Delete specific user');
    console.log('  node delete-users.js delete-duplicates       # Delete duplicate users');
  }

  await prisma.$disconnect();
}

main().catch(console.error);


