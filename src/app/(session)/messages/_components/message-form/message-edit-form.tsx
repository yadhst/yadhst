"use client";

import { useState } from "react";
import { toast } from "sonner";

import { MAX_MESSAGE_CONTENT_LENGTH } from "../../_lib/constants";
import useUpdateMessage from "../../_hooks/use-update-message";
import { useMessage } from "../../_contexts/message-context";
import TextEditor from "./text-editor";
import { SpinnerGap } from "@/components/icons/loading-icons";
import { MotionButton } from "@/components/ui/button";
import { Show } from "@/components/utilities/conditional";

export default function MessageEditForm() {
    const { message, setEditFormOpened } = useMessage();
    const [content, setContent] = useState(message.content);
    const { isPending, mutateAsync } = useUpdateMessage({
        referenceId: message.referenceId,
    });

    function handleUpdate() {
        return mutateAsync({
            id: message.id,
            userId: message.userId,
            content,
        })
            .catch((error) => toast.error(error.message))
            .finally(() => setEditFormOpened(false));
    }

    const canUpdate =
        content !== message.content && content.length > 0 && !isPending;
    return (
        <div className="flex flex-col gap-3">
            <div className="relative flex w-full min-w-0">
                <TextEditor
                    name="content"
                    placeholder={`What's on your mind, ${message.user.name}?`}
                    value={content}
                    onChange={(e) => {
                        setContent(
                            e.target.value.slice(0, MAX_MESSAGE_CONTENT_LENGTH)
                        );
                    }}
                    onKeyUp={(e) => {
                        if (e.key === "Escape") return setEditFormOpened(false);
                    }}
                />
                <div className="absolute bottom-1 right-2">
                    <span className="text-xs text-muted-foreground">
                        {content.length}/{MAX_MESSAGE_CONTENT_LENGTH}
                    </span>
                </div>
            </div>
            <div className="flex justify-end gap-3">
                <MotionButton
                    size="sm"
                    variant="outline"
                    disabled={isPending}
                    onClick={() => setEditFormOpened(false)}
                >
                    Cancel
                </MotionButton>
                <MotionButton
                    size="sm"
                    disabled={!canUpdate}
                    onClick={handleUpdate}
                >
                    <Show when={isPending} fallback="Update">
                        <SpinnerGap className="mr-2 size-4" /> Updating...
                    </Show>
                </MotionButton>
            </div>
        </div>
    );
}
