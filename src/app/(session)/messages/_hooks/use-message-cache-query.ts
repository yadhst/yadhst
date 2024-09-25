import { useCallback } from "react";
import { useQueryClient, type QueryFilters } from "@tanstack/react-query";

import {
    findMessageFromQuery,
    messagesToQueryData,
    type MessagesPredicateFunction,
    type QueryData,
} from "../_lib/utils";
import type { MessageWithUser } from "#/data";

type UpdaterFunction = (message: MessageWithUser) => MessageWithUser;
type MessageQueryFilters = {
    predicate?: MessagesPredicateFunction;
} & Omit<QueryFilters, "predicate">;

export default function useMessageCacheQuery() {
    const queryClient = useQueryClient();
    const getQueryFilters = useCallback(
        ({ predicate, exact, ...messageFilters }: MessageQueryFilters) => {
            const filters = { ...messageFilters } as QueryFilters;
            if (predicate) {
                filters.predicate = (q) => {
                    const data = (q.state.data ?? {}) as QueryData;
                    return "pages" in data
                        ? findMessageFromQuery(predicate, data)
                        : false;
                };
            }

            if (
                typeof messageFilters.queryKey !== "undefined" &&
                typeof exact === "undefined"
            ) {
                filters.exact = true;
            }

            return filters;
        },
        []
    );

    const getQueryData = useCallback(
        (messageFilters: MessageQueryFilters) => {
            const filters = getQueryFilters(messageFilters);
            const [res] = queryClient.getQueriesData<QueryData>(filters);

            return [res?.[0], res?.[1]] as const;
        },
        [getQueryFilters, queryClient]
    );

    const addMessage = useCallback(
        (messageFilters: MessageQueryFilters, newMessage: MessageWithUser) => {
            const [queryKey, queryData] = getQueryData(messageFilters);
            const updatedQueryData = messagesToQueryData(
                (messages) => [newMessage, ...messages],
                queryData
            ) as QueryData;

            const qk = queryKey ?? messageFilters.queryKey;
            return queryClient.setQueryData(qk, updatedQueryData);
        },
        [getQueryData, queryClient]
    );

    const removeMessage = useCallback(
        (messageFilters: MessageQueryFilters, messageId: string) => {
            const [queryKey, queryData] = getQueryData(messageFilters);
            const updatedQueryData = messagesToQueryData(
                (messages) => messages.filter((m) => m.id !== messageId),
                queryData
            ) as QueryData;

            const qk = queryKey ?? messageFilters.queryKey;
            return queryClient.setQueryData(qk, updatedQueryData);
        },
        [getQueryData, queryClient]
    );

    const setMessage = useCallback(
        (predicate: MessagesPredicateFunction, updater: UpdaterFunction) => {
            const [queryKey, queryData] = getQueryData({ predicate });
            const updatedQueryData = messagesToQueryData(
                (messages) =>
                    messages.map((m) => (predicate(m) ? updater(m) : m)),
                queryData
            ) as QueryData;

            return queryClient.setQueryData(queryKey, updatedQueryData);
        },
        [getQueryData, queryClient]
    );

    const addRepliesCount = useCallback(
        (predicate: MessagesPredicateFunction, num: number = 1) => {
            return setMessage(predicate, (m) => ({
                ...m,
                _count: { replies: m._count.replies + num },
            }));
        },
        [setMessage]
    );

    const subtractRepliesCount = useCallback(
        (predicate: MessagesPredicateFunction, num: number = 1) => {
            return setMessage(predicate, (m) => ({
                ...m,
                _count: { replies: m._count.replies - num },
            }));
        },
        [setMessage]
    );

    return {
        getQueryData,
        setMessage,
        addMessage,
        removeMessage,
        addRepliesCount,
        subtractRepliesCount,
    };
}
