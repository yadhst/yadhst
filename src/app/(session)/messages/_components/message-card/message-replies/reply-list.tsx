"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import { MESSAGE_QUERY_KEYS } from "../../../_lib/constants";
import { cn } from "@/lib/utils";
import { sortMessages } from "../../../_lib/utils";
import { getMessagesByPage } from "../../../_actions/message";
import { useMessage } from "../../../_contexts/message-context";
import Message from "../message";
import { SpinnerGap } from "@/components/icons/loading-icons";
import { Button } from "@/components/ui/button";
import { Show } from "@/components/utilities/conditional";

export default function ReplyList() {
    const { message } = useMessage();
    const { isFetching, isError, error, data, refetch, fetchNextPage } =
        useInfiniteQuery({
            queryKey: [...MESSAGE_QUERY_KEYS, { referenceId: message.id }],
            queryFn: ({ pageParam }) =>
                getMessagesByPage({ page: pageParam, referenceId: message.id }),
            initialPageParam: 1,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            enabled: false,
            getNextPageParam: (_, allPages) => {
                const currentMessages = allPages.flatMap(
                    (page) => page.messages
                );
                return currentMessages.length < message._count.replies
                    ? allPages.length + 1
                    : undefined;
            },
        });

    if (isError) {
        return (
            <div className="flex w-full items-center justify-center rounded-sm bg-zinc-900 px-4 py-2.5 dark:bg-zinc-800">
                <span className="text-sm text-red-500">
                    {error?.message ?? "Something went wrong"}
                </span>
            </div>
        );
    }

    const totalMessages = message._count.replies;
    const currentMessages = (
        data?.pages.flatMap((page) => page.messages) ?? []
    ).toSorted(sortMessages);

    function handleFetch() {
        if (!data?.pageParams.length) return refetch();
        return fetchNextPage();
    }

    return (
        <div className="flex flex-col gap-6">
            <div
                className={cn(
                    "mt-3 flex flex-col gap-6 empty:hidden",
                    !message.referenceId &&
                        "max-md:border-l max-md:border-border max-md:pl-4"
                )}
            >
                {currentMessages.map((message) => (
                    <Message key={message.id} message={message} />
                ))}
            </div>
            <Show when={totalMessages > currentMessages.length}>
                <Button
                    type="button"
                    size="sm"
                    disabled={isFetching}
                    onClick={handleFetch}
                >
                    <Show
                        when={isFetching}
                        fallback={`Show ${totalMessages - currentMessages.length} replies`}
                    >
                        <SpinnerGap className="mr-2 size-4" /> Loading...
                    </Show>
                </Button>
            </Show>
        </div>
    );
}
