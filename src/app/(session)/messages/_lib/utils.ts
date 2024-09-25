import type { InfiniteData } from "@tanstack/react-query";

import { FETCH_MESSAGES_LIMIT } from "./constants";
import { generateRandomString, chunksArray } from "@/lib/utils";
import type { MessageWithUser } from "#/data";
import type { GetMessagesByPageReturn } from "../_actions/message";

export function sortMessages(a: MessageWithUser, b: MessageWithUser) {
    if (a.pinnedAt && b.pinnedAt) {
        return b.pinnedAt.getTime() - a.pinnedAt.getTime();
    } else if (a.pinnedAt) {
        return -1;
    } else if (b.pinnedAt) {
        return 1;
    }

    if (a._count.replies > b._count.replies) return -1;
    if (a._count.replies < b._count.replies) return 1;

    return b.createdAt.getTime() - a.createdAt.getTime();
}

export function createTemporaryMessage(
    content: string,
    user: MessageWithUser["user"],
    referenceId?: string | null
): MessageWithUser {
    return {
        id: generateRandomString(30),
        content,
        createdAt: new Date(),
        updatedAt: null,
        pinnedAt: null,
        user,
        userId: user.id,
        referenceId: referenceId ?? null,
        reference: null,
        _count: {
            replies: 0,
        },
        isOptimistic: true,
        isTemporary: true,
    };
}

export type QueryData = InfiniteData<GetMessagesByPageReturn>;
export type UpdaterFunction = (
    messages: MessageWithUser[]
) => MessageWithUser[];
export function messagesToQueryData(
    updater: UpdaterFunction,
    data?: QueryData
) {
    const currentMessages = data?.pages.flatMap((page) => page.messages) ?? [];
    const updatedMessages = updater(currentMessages);
    const chunkedMessages = chunksArray(updatedMessages, FETCH_MESSAGES_LIMIT);

    const updatedPages = chunkedMessages
        .map((messages, index) => ({
            ...(data?.pages.at(index) ?? data?.pages.at(-1) ?? {}),
            messages,
        }))
        .slice(0, data?.pages.length || chunkedMessages.length);

    return {
        pages: updatedPages,
        pageParams: data?.pageParams ?? [],
    };
}

export type MessagesPredicateFunction = (message: MessageWithUser) => boolean;
export function findMessageFromQuery(
    predicate: MessagesPredicateFunction,
    data?: QueryData
) {
    const currentMessages = data?.pages.flatMap((page) => page.messages) ?? [];
    return currentMessages.some(predicate);
}
