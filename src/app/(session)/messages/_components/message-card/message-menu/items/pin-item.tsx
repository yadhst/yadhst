"use client";

import { useCallback } from "react";
import { toast } from "sonner";
import { DrawingPinFilledIcon, DrawingPinIcon } from "@radix-ui/react-icons";

import useUpdateMessage from "../../../../_hooks/use-update-message";
import { useMessage } from "../../../../_contexts/message-context";
import ConfirmDialog from "@/components/features/confirm-dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export default function PinItem() {
    const { message } = useMessage();

    const isPinned = !!message.pinnedAt;
    const PinIcon = isPinned ? DrawingPinIcon : DrawingPinFilledIcon;

    const { mutateAsync } = useUpdateMessage({
        referenceId: message.referenceId,
    });

    const handlePin = useCallback(() => {
        return mutateAsync({
            id: message.id,
            userId: message.userId,
            pinnedAt: isPinned ? null : new Date(),
        }).catch((error) => toast.error(error.message));
    }, [isPinned, message.id, message.userId, mutateAsync]);

    return (
        <ConfirmDialog
            title="Are you absolutely sure?"
            description={`Are you really wants to ${isPinned ? "unpin" : "pin"} this message?`}
            confirmText={isPinned ? "Unpin" : "Pin"}
            onConfirm={handlePin}
        >
            <DropdownMenuItem
                className="group cursor-pointer text-xs hover:!text-green-500"
                onSelect={(e) => e.preventDefault()}
            >
                <PinIcon className="mr-2 size-3 group-hover:fill-green-500" />
                <span>{isPinned ? "Unpin" : "Pin"}</span>
            </DropdownMenuItem>
        </ConfirmDialog>
    );
}
