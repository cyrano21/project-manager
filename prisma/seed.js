import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Créer une équipe par défaut
  const defaultTeam = await prisma.team.create({
    data: {
      name: 'Default Team',
      members: {
        create: [
          {
            name: 'John Doe',
            role: 'Project Manager',
            email: 'john@example.com',
            phone: '+1 234 567 890',
            avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=random',
            status: 'ACTIVE'
          },
          {
            name: 'Jane Smith',
            role: 'Developer',
            email: 'jane@example.com',
            phone: '+1 234 567 891',
            avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=random',
            status: 'ACTIVE'
          }
        ]
      }
    },
    include: {
      members: true
    }
  })

  console.log('Seed data created:', defaultTeam)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })