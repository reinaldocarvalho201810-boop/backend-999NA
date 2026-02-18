import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

async function main() {

  await prisma.user.upsert({
    where: { email: "admin@999na.com" },
    update: {},
    create: {
      email: "admin@999na.com",
      password: "12345678",
      balance: 10000
    }
  });

  console.log("Seed executado com sucesso");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
