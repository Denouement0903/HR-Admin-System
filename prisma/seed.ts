import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('TestPass1234', 10);
  
  const hradmin = await prisma.user.upsert({
    where: { email: 'hradmin@test.com' },
    update: {},
    create: {
      email: 'hradmin@test.com',
      name: 'HR Admin',
      password: hashedPassword,
      role: 'hradmin',
    },
  });

  const manager = await prisma.user.upsert({
    where: { email: 'manager@test.com' },
    update: {},
    create: {
      email: 'manager@test.com',
      name: 'Manager',
      password: hashedPassword,
      role: 'manager',
    },
  });

  const employee = await prisma.user.upsert({
    where: { email: 'employee@test.com' },
    update: {},
    create: {
      email: 'employee@test.com',
      name: 'Employee',
      password: hashedPassword,
      role: 'employee',
    },
  });

  console.log('Seed data inserted successfully:', { hradmin, manager, employee });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });