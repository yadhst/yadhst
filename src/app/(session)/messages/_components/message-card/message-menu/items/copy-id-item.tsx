"use client";

import { CopyToClipboard } from "react-copy-to-clipboard";
import { ClipboardCopyIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";

import { useMessage } from "../../../../_contexts/message-context";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export default function CopyIdItem() {
    const { message } = useMessage();

    return (
        <CopyToClipboard
            text={message.id}
            onCopy={() => toast.success("Copied to clipboard")}
        >
            <DropdownMenuItem className="group cursor-pointer text-xs hover:!text-green-500">
                <ClipboardCopyIcon className="mr-2 size-3 group-hover:fill-green-500" />
                <span>Copy ID</span>
            </DropdownMenuItem>
        </CopyToClipboard>
    );
}
