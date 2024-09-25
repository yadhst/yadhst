"use client";

import MessageCard from ".";
import { MessageContextProvider } from "../../_contexts/message-context";
import type { MessageWithUser } from "#/data";

type MessageProps = { message: MessageWithUser };
export default function Message({ message }: MessageProps) {
    return (
        <MessageContextProvider message={message}>
            <MessageCard />
        </MessageContextProvider>
    );
}
