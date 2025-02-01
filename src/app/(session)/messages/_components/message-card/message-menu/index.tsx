"use client";

import { Fragment } from "react";

import { useCurrentUser } from "@/contexts/current-user-context";
import { useMessage } from "../../../_contexts/message-context";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuGroup,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import PinItem from "./items/pin-item";
import DeleteItem from "./items/delete-item";
import EditItem from "./items/edit-item";
import CopyItem from "./items/copy-item";
import CopyIdItem from "./items/copy-id-item";
import { Show } from "@/components/utilities/conditional";
import { SpinnerGap } from "@/components/icons/loading-icons";

const messageMenuItems = [
    {
        id: "admin-only",
        items: [
            {
                id: "pin",
                permissions: ["admin"],
                component: PinItem,
            },
        ],
    },
    {
        id: "message-action",
        items: [
            {
                id: "edit",
                permissions: ["user"],
                component: EditItem,
            },
            {
                id: "delete",
                permissions: ["user"],
                component: DeleteItem,
            },
        ],
    },
    {
        id: "utility",
        items: [
            {
                id: "copy",
                permissions: [],
                component: CopyItem,
            },
            {
                id: "copy-id",
                permissions: ["admin"],
                component: CopyIdItem,
            },
        ],
    },
];

type MessageMenuProps = {
    children: React.ReactNode;
};
export default function MessageMenu({ children }: MessageMenuProps) {
    const { message } = useMessage();
    const { currentUser } = useCurrentUser();
    const isAuthor = message.userId === currentUser?.id;

    const filteredMenuItems = messageMenuItems.reduce(
        (prev, item) => {
            const filteredItems = item.items.filter(({ permissions }) => {
                const validPermissions = permissions.filter((perm) => {
                    if (perm === "admin" && !currentUser?.isAdmin) return false;
                    if (perm === "user" && !isAuthor) return false;
                    if (perm === "users" && !currentUser) return false;
                    return true;
                });

                return permissions.length ? !!validPermissions.length : true;
            });

            if (filteredItems.length)
                return [...prev, { ...item, items: filteredItems }];

            return prev;
        },
        [] as typeof messageMenuItems
    );

    if (message.isOptimistic) return <SpinnerGap className="size-3" />;
    return (
        <Show when={!!filteredMenuItems.length}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    {filteredMenuItems.map(({ id, items }, index) => {
                        return (
                            <Fragment key={id}>
                                <DropdownMenuGroup aria-label={id}>
                                    {items.map((item) => (
                                        <item.component key={item.id} />
                                    ))}
                                </DropdownMenuGroup>
                                <Show when={!!filteredMenuItems[index + 1]}>
                                    <DropdownMenuSeparator />
                                </Show>
                            </Fragment>
                        );
                    })}
                </DropdownMenuContent>
            </DropdownMenu>
        </Show>
    );
}
