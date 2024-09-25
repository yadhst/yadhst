"use server";

import {
    FETCH_MESSAGES_LIMIT,
    MAX_MESSAGE_CONTENT_LENGTH,
} from "../_lib/constants";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/data/user";
import type { RequiredAtLeastOne } from "#/index";

const messageIncludes = {
    user: true,
    reference: {
        select: {
            user: true,
        },
    },
    _count: {
        select: {
            replies: true,
        },
    },
};

// HELPER
type CheckAuthorizationOptions = { userId: string; adminOnly?: boolean };
async function checkAuthorization({
    userId,
    adminOnly,
}: CheckAuthorizationOptions) {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error("You must be logged in.");
    if (adminOnly) {
        if (!currentUser.isAdmin)
            throw new Error(
                "You don't have permission to perform this action."
            );
    } else if (userId !== currentUser.id) {
        throw new Error("You don't have permission to perform this action.");
    }

    return true;
}

// CREATE
export type CreateMessageData = {
    userId: string;
    content: string;
    referenceId?: string;
};
export async function createMessage({
    userId,
    content,
    referenceId,
}: CreateMessageData) {
    await checkAuthorization({ userId });
    if (!content.length) throw new Error("You can't send an empty message.");

    try {
        return await prisma.message.create({
            data: {
                userId,
                referenceId,
                content: content.slice(0, MAX_MESSAGE_CONTENT_LENGTH),
                createdAt: new Date(),
            },
            include: messageIncludes,
        });
    } catch (err) {
        console.error(err);
        throw new Error("Failed to create message.");
    }
}

// READ
export type GetMessagesByPageData = { page: number; referenceId?: string };
export type GetMessagesByPageReturn = Awaited<
    ReturnType<typeof getMessagesByPage>
>;
export async function getMessagesByPage({
    page,
    referenceId,
}: GetMessagesByPageData) {
    const take = FETCH_MESSAGES_LIMIT;
    const skip = (page - 1) * FETCH_MESSAGES_LIMIT;

    try {
        const referenceIdOptions = referenceId ?? { isSet: false };
        const findMessages = prisma.message.findMany({
            take,
            skip,
            where: { referenceId: referenceIdOptions },
            include: messageIncludes,
            orderBy: [
                { pinnedAt: "desc" },
                { replies: { _count: "desc" } },
                { createdAt: "desc" },
            ],
        });

        const getTotalMessages = prisma.message.count({
            where: { referenceId: referenceIdOptions },
        });

        const [messages, totalMessages] = await prisma.$transaction([
            findMessages,
            getTotalMessages,
        ]);

        return { messages, totalMessages, take, skip };
    } catch (err) {
        console.error(err);
        throw new Error("Failed to get messages.");
    }
}

// UPDATE
export type UpdateMessageData = {
    id: string;
    userId: string;
} & RequiredAtLeastOne<{ content: string; pinnedAt: Date | null }>;
export async function updateMessage({
    id,
    userId,
    ...data
}: UpdateMessageData) {
    await checkAuthorization({ userId, adminOnly: "pinnedAt" in data });
    if (data.content?.length === 0)
        throw new Error("You can't send an empty message.");

    try {
        return await prisma.message.update({
            where: { id, userId },
            data: {
                content: data.content?.slice(0, MAX_MESSAGE_CONTENT_LENGTH),
                pinnedAt: data.pinnedAt,
                updatedAt: new Date(),
            },
            include: messageIncludes,
        });
    } catch (err) {
        console.error(err);
        throw new Error("Failed to update message.");
    }
}

// DELETE
export type DeleteMessageData = { id: string; userId: string };
async function deleteMessageWithReplies({ id, userId }: DeleteMessageData) {
    const replies = await prisma.message.findMany({
        where: { referenceId: id },
        select: { id: true, userId: true },
    });

    const deleteReplies = replies.map((reply) =>
        deleteMessageWithReplies(reply)
    );
    await Promise.all(deleteReplies);

    return await prisma.message.delete({ where: { id, userId } });
}

export async function deleteMessage({ id, userId }: DeleteMessageData) {
    await checkAuthorization({ userId });

    try {
        return await deleteMessageWithReplies({ id, userId });
    } catch (err) {
        console.error(err);
        throw new Error("Failed to delete message.");
    }
}
