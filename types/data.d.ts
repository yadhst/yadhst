import type { Prisma } from "@prisma/client";

export type User = Prisma.UserGetPayload<true>;
export type MessageWithUser = Prisma.MessageGetPayload<{
    include: {
        user: true;
        reference: {
            select: {
                user: true;
            };
        };
        _count: {
            select: {
                replies: true;
            };
        };
    };
}> &
    Record<`is${string}`, boolean>;
