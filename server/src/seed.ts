import { faker } from '@faker-js/faker';
import { hash } from 'argon2';
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const contries = ['Ukraine', 'Poland', 'Japan', 'South Korea', 'China', 'USA'];

async function main() {
  const COUNT_USERS = 200;

  for (let i = 0; i < COUNT_USERS; i++) {
    const name = faker.person.firstName();
    const email = faker.internet.email();
    const avatarUrl = faker.image.avatar();
    const password = await hash('123456');
    const country = faker.helpers.arrayElement(contries);
    const createdAt = faker.date.past({ years: 1 });
    const updatedAt = new Date(
      createdAt.getTime() +
        Math.random() * (new Date().getTime() - createdAt.getTimezoneOffset()),
    );

    await prisma.user.create({
      data: {
        name,
        email,
        avatarUrl,
        password,
        country,
        createdAt,
        updatedAt,
      },
    });
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
