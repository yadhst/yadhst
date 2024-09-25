import { PrismaClient } from "@prisma/client";

declare global {
    namespace NodeJS {
        interface Global {}
    }
}

interface CustomNodeJSGlobal extends NodeJS.Global {
    prisma: PrismaClient;
}

declare const global: CustomNodeJSGlobal;

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === "development") global.prisma = prisma;

export default prisma;
