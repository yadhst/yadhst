"use client";

import { Pencil2Icon } from "@radix-ui/react-icons";

import { useMessage } from "../../../../_contexts/message-context";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export default function EditItem() {
    const { setEditFormOpened } = useMessage();

    return (
        <DropdownMenuItem
            className="group cursor-pointer text-xs hover:!text-blue-500"
            onSelect={() => setEditFormOpened(true)}
        >
            <Pencil2Icon className="mr-2 size-3 group-hover:fill-blue-500" />
            <span>Edit</span>
        </DropdownMenuItem>
    );
}
