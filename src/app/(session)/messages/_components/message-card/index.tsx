"use client";

import {
    DrawingPinFilledIcon,
    DotsHorizontalIcon,
} from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { useCurrentUser } from "@/contexts/current-user-context";
import { useMessage } from "../../_contexts/message-context";
import MessageMenu from "./message-menu";
import MessageActions from "./message-actions";
import MessageReplies from "./message-replies";
import LazyImage from "@/components/utilities/lazy-image";
import TimeAgo from "@/components/features/time-ago";
import MessageEditForm from "../message-form/message-edit-form";
import { Show } from "@/components/utilities/conditional";
import { Crown, ArrowBendUpRight } from "@/components/icons";

export default function MessageCard() {
    const { message, editFormOpened } = useMessage();
    const { currentUser } = useCurrentUser();
    const userAvatar = message.user.image ?? "/images/default-avatar.jpeg";

    function jumpToReference() {
        const referenceElement = document.getElementById(message.referenceId!);
        if (!referenceElement) return null;

        const referenceRect = referenceElement.getBoundingClientRect();
        const referenceTop = referenceRect.top + window.scrollY;
        const HEADER_HEIGHT = 33; // or get from the dom itself
        window.scrollTo({
            top: referenceTop - HEADER_HEIGHT,
            behavior: "smooth",
        });

        referenceElement.classList.add("bg-primary/10");
        setTimeout(() => {
            referenceElement.classList.remove("bg-primary/10");
        }, 800);
    }

    return (
        <div
            id={message.id}
            className="flex flex-col gap-1.5 rounded-sm transition duration-150 ease-linear"
        >
            <div className="flex items-center gap-1.5 empty:hidden">
                <Show when={!!message.pinnedAt}>
                    <div className="dot-separator flex items-center gap-1 text-xs text-muted-foreground">
                        <DrawingPinFilledIcon className="size-3" />
                        <span>
                            {message.isPinning
                                ? "Pinning Message..."
                                : "Pinned Message"}
                        </span>
                    </div>
                </Show>
                <Show when={!!message.reference}>
                    <button
                        type="button"
                        title="Jump to Reference"
                        className="dot-separator flex items-center gap-1 text-xs text-muted-foreground transition duration-150 ease-linear hover:text-foreground"
                        onClick={jumpToReference}
                    >
                        <ArrowBendUpRight className="size-3" />
                        <span>Replied to {message.reference?.user.name}</span>
                    </button>
                </Show>
            </div>
            <div className="flex gap-3">
                <div className="size-12 flex-none">
                    <LazyImage
                        alt="avatar"
                        className="size-full rounded-lg object-cover"
                        width={48}
                        height={48}
                        data-thumbnail-width={48 * 3}
                        data-thumbnail-height={48 * 3}
                        data-thumbnail-source={userAvatar}
                        src={userAvatar}
                    />
                </div>
                <div className="flex min-w-0 flex-grow flex-col gap-1 text-sm">
                    <div className="flex justify-between gap-2">
                        <div className="flex flex-1 flex-col gap-1 md:flex-row md:justify-between">
                            <div className="flex max-w-[45%] items-center gap-1.5">
                                <div className="flex max-w-full">
                                    <span className="truncate font-semibold">
                                        {message.user.name}
                                    </span>
                                </div>
                                <Show when={!!message.user.isAdmin}>
                                    <div className="flex gap-1">
                                        <Crown className="size-3 text-yellow-500" />
                                    </div>
                                </Show>
                            </div>
                            <div className="flex items-center">
                                <TimeAgo
                                    key={message.id}
                                    dateTime={message.createdAt}
                                    className="text-xs text-muted-foreground"
                                />
                            </div>
                        </div>
                        <div className="flex items-start empty:hidden md:items-center">
                            <MessageMenu>
                                <button type="button">
                                    <DotsHorizontalIcon className="size-3" />
                                    <span className="sr-only">Toggle Menu</span>
                                </button>
                            </MessageMenu>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 max-md:-ml-[60px] max-md:mt-4">
                        <div>
                            <Show
                                when={
                                    !editFormOpened ||
                                    !currentUser ||
                                    message.isDeleting
                                }
                                fallback={<MessageEditForm />}
                            >
                                <p
                                    className={cn(
                                        "whitespace-pre-wrap text-sm transition duration-150 ease-linear",
                                        message.isTemporary && "opacity-50",
                                        message.isDeleting && "text-red-500"
                                    )}
                                >
                                    {message.content}
                                </p>
                            </Show>
                        </div>
                        <div>
                            <Show
                                when={
                                    !(message.isTemporary || message.isDeleting)
                                }
                            >
                                <MessageActions />
                            </Show>
                            <div
                                className={cn(
                                    message.referenceId && "md:-ml-[60px]"
                                )}
                            >
                                <MessageReplies />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
