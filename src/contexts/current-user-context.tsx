"use client";

import { createContext, useContext } from "react";

import type { User } from "#/data";

type CurrentUserContextData = { currentUser: User | null };
export const CurrentUserContext = createContext<CurrentUserContextData | null>(
    null
);

type CurrentUserProviderProps = {
    children: React.ReactNode;
    payloadUser: User | null;
};
export function CurrentUserProvider({
    children,
    payloadUser,
}: CurrentUserProviderProps) {
    return (
        <CurrentUserContext.Provider value={{ currentUser: payloadUser }}>
            {children}
        </CurrentUserContext.Provider>
    );
}

export function useCurrentUser() {
    const context = useContext(CurrentUserContext);
    if (!context) {
        throw new Error(
            "useCurrentUser must be used within a CurrentUserProvider"
        );
    }

    return context;
}
