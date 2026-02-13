import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed do banco 999NA...')

  await prisma.game.deleteMany()

  await prisma.game.createMany({
    data: [
      // 🔥 PG SOFT – Fortune Series
      {
        name: 'Fortune Tiger',
        slug: 'fortune-tiger',
        provider: 'PG_SOFT',
        category: 'SLOT',
        thumbnail: '/games/pg/fortune-tiger.png',
        isHot: true
      },
      {
        name: 'Fortune Rabbit',
        slug: 'fortune-rabbit',
        provider: 'PG_SOFT',
        category: 'SLOT',
        thumbnail: '/games/pg/fortune-rabbit.png'
      },
      {
        name: 'Fortune OX',
        slug: 'fortune-ox',
        provider: 'PG_SOFT',
        category: 'SLOT',
        thumbnail: '/games/pg/fortune-ox.png'
      },
      {
        name: 'Fortune Dragon',
        slug: 'fortune-dragon',
        provider: 'PG_SOFT',
        category: 'SLOT',
        thumbnail: '/games/pg/fortune-dragon.png'
      },
      {
        name: 'Fortune Mouse',
        slug: 'fortune-mouse',
        provider: 'PG_SOFT',
        category: 'SLOT',
        thumbnail: '/games/pg/fortune-mouse.png'
      },
      {
        name: 'Fortune Gods',
        slug: 'fortune-gods',
        provider: 'PG_SOFT',
        category: 'SLOT',
        thumbnail: '/games/pg/fortune-gods.png'
      },

      // 🎰 PG SOFT – Outros
      {
        name: 'Lucky Neko',
        slug: 'lucky-neko',
        provider: 'PG_SOFT',
        category: 'SLOT',
        thumbnail: '/games/pg/lucky-neko.png'
      },
      {
        name: 'Double Fortune',
        slug: 'double-fortune',
        provider: 'PG_SOFT',
        category: 'SLOT',
        thumbnail: '/games/pg/double-fortune.png'
      },
      {
        name: 'Ganesha Gold',
        slug: 'ganesha-gold',
        provider: 'PG_SOFT',
        category: 'SLOT',
        thumbnail: '/games/pg/ganesha-gold.png'
      },
      {
        name: 'Candy Bonanza',
        slug: 'candy-bonanza',
        provider: 'PG_SOFT',
        category: 'SLOT',
        thumbnail: '/games/pg/candy-bonanza.png'
      },

      // 🎯 TADA GAMING
      {
        name: 'Money Coming',
        slug: 'money-coming',
        provider: 'TADA',
        category: 'SLOT',
        thumbnail: '/games/tada/money-coming.png'
      },
      {
        name: 'Tigre da Sorte',
        slug: 'tigre-da-sorte',
        provider: 'TADA',
        category: 'SLOT',
        thumbnail: '/games/tada/tigre-da-sorte.png'
      },
      {
        name: 'Arara da Sorte',
        slug: 'arara-da-sorte',
        provider: 'TADA',
        category: 'SLOT',
        thumbnail: '/games/tada/arara-da-sorte.png'
      },
      {
        name: '3 Pot Dragons',
        slug: '3-pot-dragons',
        provider: 'TADA',
        category: 'SLOT',
        thumbnail: '/games/tada/3-pot-dragons.png'
      },

      // 🐼 PANDA / FAT PANDA
      {
        name: 'Prosperity Dragon',
        slug: 'prosperity-dragon',
        provider: 'PANDA',
        category: 'SLOT',
        thumbnail: '/games/panda/prosperity-dragon.png'
      },
      {
        name: 'Prosperity Rabbit',
        slug: 'prosperity-rabbit',
        provider: 'PANDA',
        category: 'SLOT',
        thumbnail: '/games/panda/prosperity-rabbit.png'
      },
      {
        name: 'Lucky Tiger',
        slug: 'lucky-tiger',
        provider: 'FAT_PANDA',
        category: 'SLOT',
        thumbnail: '/games/fatpanda/lucky-tiger.png'
      },

      // 🚀 CRASH
      {
        name: 'Aviator',
        slug: 'aviator',
        provider: 'SPRIBE',
        category: 'CRASH',
        thumbnail: '/games/crash/aviator.png'
      }
    ]
  })

  console.log('✅ Seed finalizado com sucesso!')
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
