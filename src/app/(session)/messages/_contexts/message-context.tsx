"use client";

import {
    createContext,
    useContext,
    useState,
    type Dispatch,
    type SetStateAction,
} from "react";

import type { MessageWithUser } from "#/data";

type MessageContextData = {
    message: MessageWithUser;
    editFormOpened: boolean;
    replyFormOpened: boolean;
    setEditFormOpened: Dispatch<SetStateAction<boolean>>;
    setReplyFormOpened: Dispatch<SetStateAction<boolean>>;
};
export const MessageContext = createContext<MessageContextData | null>(null);

type MessageContextProviderProps = {
    children: React.ReactNode;
    message: MessageWithUser;
};
export function MessageContextProvider({
    children,
    message,
}: MessageContextProviderProps) {
    const [editFormOpened, setEditFormOpened] = useState(false);
    const [replyFormOpened, setReplyFormOpened] = useState(false);

    return (
        <MessageContext.Provider
            value={{
                message,
                editFormOpened,
                replyFormOpened,
                setEditFormOpened,
                setReplyFormOpened,
            }}
        >
            {children}
        </MessageContext.Provider>
    );
}

export function useMessage() {
    const context = useContext(MessageContext);
    if (!context)
        throw new Error(
            "useMessage must be used within a 'MessageContextProvider'"
        );

    return context;
}
