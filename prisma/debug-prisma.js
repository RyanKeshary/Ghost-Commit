const prismaClientModule = require("@prisma/client");
console.log("Keys in @prisma/client:", Object.keys(prismaClientModule));

const { PrismaClient } = prismaClientModule;
if (!PrismaClient) {
  console.log("PrismaClient is undefined!");
} else {
  console.log("PrismaClient is a:", typeof PrismaClient);
  try {
    const prisma = new PrismaClient();
    console.log("Prisma instance created successfully");
  } catch (e) {
    console.log("Failed to create Prisma instance:", e.message);
    console.log("Full error:", e);
  }
}
