"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { GearIcon } from "@radix-ui/react-icons";

import { MAX_MESSAGE_CONTENT_LENGTH } from "../../_lib/constants";
import { useCurrentUser } from "@/contexts/current-user-context";
import useCreateMessage from "../../_hooks/use-create-message";
import SignInForm from "../sign-in-form";
import UserMenu from "./user-menu";
import TextEditor from "./text-editor";
import { SpinnerGap } from "@/components/icons/loading-icons";
import { MotionButton } from "@/components/ui/button";

type MessageFormProps = {
    referenceId?: string;
    closeReply?: () => void;
};
export default function MessageForm({
    referenceId,
    closeReply,
}: MessageFormProps) {
    const { currentUser } = useCurrentUser();
    const [content, setContent] = useState("");
    const { isPending, mutateAsync } = useCreateMessage({
        referenceId,
    });

    if (!currentUser) return <SignInForm />;

    function sendMessage() {
        return mutateAsync({ content, userId: currentUser!.id, referenceId })
            .then(() => {
                setContent("");
                closeReply?.();
                return;
            })
            .catch((error) => toast.error(error.message));
    }

    const canSendMessage = content.length > 0 && !isPending;
    return (
        <div className="flex flex-col gap-3">
            <div className="flex gap-3">
                <div className="size-12 flex-none">
                    <UserMenu>
                        <div className="relative size-full cursor-pointer">
                            <div className="absolute -right-1 -top-1">
                                <GearIcon className="size-5 text-red-500" />
                            </div>
                            <Image
                                alt="avatar"
                                src={
                                    currentUser.image ??
                                    "/images/default-avatar.jpeg"
                                }
                                width={48}
                                height={48}
                                className="size-full rounded-lg object-cover"
                            />
                        </div>
                    </UserMenu>
                </div>
                <div className="relative flex min-w-0 grow">
                    <TextEditor
                        name="content"
                        placeholder={`What's on your mind, ${currentUser.name}?`}
                        value={content}
                        onChange={(e) =>
                            setContent(
                                e.target.value.slice(
                                    0,
                                    MAX_MESSAGE_CONTENT_LENGTH
                                )
                            )
                        }
                        onKeyUp={(e) => {
                            if (e.key === "Escape" && closeReply) {
                                return closeReply();
                            }
                        }}
                        autoFocus
                    />
                    <div className="absolute bottom-1 right-2">
                        <span className="text-xs text-muted-foreground">
                            {content.length}/{MAX_MESSAGE_CONTENT_LENGTH}
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex justify-end gap-3">
                {referenceId && closeReply && (
                    <MotionButton
                        type="button"
                        size="sm"
                        variant="outline"
                        disabled={isPending}
                        onClick={closeReply}
                    >
                        Cancel
                    </MotionButton>
                )}
                <MotionButton
                    type="button"
                    size="sm"
                    disabled={!canSendMessage}
                    onClick={sendMessage}
                >
                    {isPending && <SpinnerGap className="mr-2 size-4" />}
                    {isPending ? "Sending..." : "Send"}
                </MotionButton>
            </div>
        </div>
    );
}
