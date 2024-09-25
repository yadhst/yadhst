"use client";

import { useTransition, useCallback } from "react";
import { toast } from "sonner";
import { ExitIcon } from "@radix-ui/react-icons";

import { logout } from "../../../_actions/session";
import ConfirmDialog from "@/components/features/confirm-dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type UserMenuProps = { children: React.ReactNode };
export default function UserMenu({ children }: UserMenuProps) {
    const [isPending, startTransition] = useTransition();
    const handleLogout = useCallback((close: () => void) => {
        startTransition(() => {
            logout().then(() => {
                toast.success("Signed Out.");
                close();
            });
        });
    }, []);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
            <DropdownMenuContent className="ml-1">
                <ConfirmDialog
                    title="Are you sure?"
                    description="Are you sure you want to sign out?"
                    confirmText={isPending ? "Signing Out..." : "Sign Out"}
                    disableCancel={isPending}
                    disableConfirm={isPending}
                    onConfirm={handleLogout}
                    closeOnConfirm={false}
                >
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onSelect={(e) => e.preventDefault()}
                    >
                        <ExitIcon className="mr-2 size-3" />
                        <span className="text-xs">Sign out</span>
                    </DropdownMenuItem>
                </ConfirmDialog>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
