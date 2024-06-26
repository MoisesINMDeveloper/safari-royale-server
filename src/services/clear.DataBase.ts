import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function clearDatabase() {
  try {
    // Borrar datos de todas las tablas
    await prisma.ticket.deleteMany({});
    await prisma.raffle.deleteMany({});
    await prisma.combination.deleteMany({});
    await prisma.color.deleteMany({});
    await prisma.animal.deleteMany({});
    await prisma.combinationOnTicket.deleteMany({});
    await prisma.bank.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.phone.deleteMany({});
    // Añade más tablas según sea necesario

    console.log("Todas las tablas han sido limpiadas.");
  } catch (error) {
    console.error("Error limpiando la base de datos:", error);
  } finally {
    await prisma.$disconnect();
  }
}

clearDatabase();
