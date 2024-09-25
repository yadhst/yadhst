"use client";

import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

import { MESSAGE_QUERY_KEYS } from "../_lib/constants";
import { sortMessages } from "../_lib/utils";
import { getMessagesByPage } from "../_actions/message";
import Message from "./message-card/message";
import { SpinnerGap } from "@/components/icons/loading-icons";

export default function MessageList() {
    const [ref, inView] = useInView({ threshold: 0.5 });
    const { isLoading, isError, error, data, hasNextPage, fetchNextPage } =
        useInfiniteQuery({
            queryKey: MESSAGE_QUERY_KEYS,
            queryFn: ({ pageParam }) => getMessagesByPage({ page: pageParam }),
            initialPageParam: 1,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            getNextPageParam: (lastPage, allPages) => {
                const currentMessages = allPages.flatMap(
                    (page) => page.messages
                );
                return currentMessages.length < lastPage.totalMessages
                    ? allPages.length + 1
                    : undefined;
            },
        });

    useEffect(() => {
        if (inView) fetchNextPage();
    }, [inView, fetchNextPage]);

    if (isLoading) return <MessageListLoader />;
    if (isError) {
        return (
            <div className="flex w-full items-center justify-center rounded-sm bg-zinc-900 px-4 py-2.5 dark:bg-zinc-800">
                <span className="text-sm text-red-500">
                    {error?.message ?? "Something went wrong"}
                </span>
            </div>
        );
    }

    const currentMessages = (
        data?.pages.flatMap((page) => page.messages) ?? []
    ).toSorted(sortMessages);

    return (
        <div className="flex flex-col gap-8 !overflow-visible md:gap-6">
            {currentMessages.map((message) => (
                <Message key={message.id} message={message} />
            ))}
            {hasNextPage && (
                <div ref={ref} className="w-full">
                    <MessageListLoader />
                </div>
            )}
        </div>
    );
}

export function MessageListLoader() {
    return (
        <div className="flex w-full items-center justify-center">
            <SpinnerGap className="size-8" />
        </div>
    );
}
