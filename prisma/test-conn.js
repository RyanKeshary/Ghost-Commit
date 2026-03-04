const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({});

async function test() {
  try {
    const users = await prisma.user.findMany();
    console.log("Connected! Users found:", users.length);
  } catch (e) {
    console.error("Connection failed:", e);
  } finally {
    await prisma.$disconnect();
  }
}

test();
