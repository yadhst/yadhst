"use client";

import { useCallback } from "react";
import { toast } from "sonner";
import { TrashIcon } from "@radix-ui/react-icons";

import useDeleteMessage from "../../../../_hooks/use-delete-message";
import { useMessage } from "../../../../_contexts/message-context";
import ConfirmDialog from "@/components/features/confirm-dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export default function DeleteItem() {
    const { message } = useMessage();
    const { mutateAsync } = useDeleteMessage({
        referenceId: message.referenceId,
    });

    const handleDelete = useCallback(() => {
        return mutateAsync({ id: message.id, userId: message.userId }).catch(
            (error) => toast.error(error.message)
        );
    }, [message.id, message.userId, mutateAsync]);

    return (
        <ConfirmDialog
            title="Are you absolutely sure?"
            description="This action cannot be undone. This will permanently delete your message."
            confirmText="Delete"
            onConfirm={handleDelete}
        >
            <DropdownMenuItem
                className="group cursor-pointer text-xs hover:!text-red-500"
                onSelect={(e) => e.preventDefault()}
            >
                <TrashIcon className="mr-2 size-3 group-hover:fill-red-500" />
                <span>Delete</span>
            </DropdownMenuItem>
        </ConfirmDialog>
    );
}
