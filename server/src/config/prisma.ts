import { PrismaClient } from "@prisma/client";

export const usePrisma = new PrismaClient();

export async function PrismaConnect() {
  try {
    await usePrisma.$connect();
    console.log("connected to db");
  } catch (error) {
    console.error(error);
  }
}
