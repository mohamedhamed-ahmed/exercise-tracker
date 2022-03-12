const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  let numberOfUsers = 5;
  for (let i = 0; i < numberOfUsers; i++) {
    let userId = i + 1;
    const user = await prisma.user.upsert({
      where: {
        name: `Test User ${userId}`,
      },
      update: {},
      create: {
        name: `Test User ${userId}`,
      },
    });

    if (user && user.id) {
      await prisma.exercise.upsert({
        where: {
          description: `Exercise for user ${userId}`,
        },
        update: {},
        create: {
          user_id: user.id,
          description: `Exercise for user ${userId}`,
          duration: 2,
          date: `2022-0${userId}-0${userId}T0${userId}:00:00Z`,
        },
      });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
