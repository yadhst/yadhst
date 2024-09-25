"use client";

import { useCurrentUser } from "@/contexts/current-user-context";
import { useMessage } from "../../../_contexts/message-context";
import ReplyItem from "./items/reply-item";

const messageActionItems = [
    {
        id: "reply",
        permissions: ["users"],
        component: ReplyItem,
    },
];

export default function MessageActions() {
    const { message } = useMessage();
    const { currentUser } = useCurrentUser();
    const isAuthor = message.userId === currentUser?.id;

    const filteredActionItems = messageActionItems.reduce(
        (prev, item) => {
            const validPermissions = item.permissions.filter((perm) => {
                if (perm === "admin" && !currentUser?.isAdmin) return false;
                if (perm === "user" && !isAuthor) return false;
                if (perm === "users" && !currentUser) return false;
                return true;
            });

            if (validPermissions.length) return [...prev, item];

            return prev;
        },
        [] as typeof messageActionItems
    );

    if (!currentUser) return null;
    return (
        <div className="flex items-center gap-2">
            {filteredActionItems.map((item) => (
                <item.component key={item.id} />
            ))}
        </div>
    );
}
