import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

const createPrismaClient = () => {
    return new PrismaClient({
        log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    });
};

// Lazy initialization using a Proxy to avoid Prisma init during Next.js build
export const prisma = new Proxy({} as PrismaClient, {
    get: (target, prop, receiver) => {
        if (!globalForPrisma.prisma) {
            globalForPrisma.prisma = createPrismaClient();
        }
        return Reflect.get(globalForPrisma.prisma, prop, receiver);
    },
});
