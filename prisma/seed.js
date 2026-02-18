import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

async function main() {

  // cria usuário de teste
  await prisma.user.upsert({
    where: { email: "teste@999na.com" },
    update: {},
    create: {
      email: "teste@999na.com",
      password: "12345678",
      balance: 1000
    }
  });

  console.log("Seed executado com sucesso");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
