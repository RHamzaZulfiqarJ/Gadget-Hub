import prisma from "../../prisma";

export const connectDatabase = async() => {
    try {
        await prisma.$connect();
    } catch (error) {
        console.error("Database connection error", error);
    }
}