"use client";

import { useTransition } from "react";
import Image from "next/image";

import { login } from "../../_actions/session";
import { Show } from "@/components/utilities/conditional";
import { SpinnerGap } from "@/components/icons/loading-icons";
import { MotionButton } from "@/components/ui/button";

export default function SignInForm() {
    const [isPending, startTransition] = useTransition();

    function handleLogin() {
        startTransition(() => {
            login();
        });
    }

    return (
        <div className="flex flex-col gap-3">
            <div className="flex gap-3">
                <div className="size-12 flex-none">
                    <div className="relative size-full">
                        <Image
                            alt="avatar"
                            src="/images/default-avatar.jpeg"
                            width={48}
                            height={48}
                            className="size-full rounded-lg object-cover"
                        />
                    </div>
                </div>
                <div className="flex grow">
                    <div className="h-[138px] w-full cursor-not-allowed rounded-md border border-input bg-background px-3 py-2 opacity-50">
                        <span className="text-sm text-muted-foreground">
                            Sign in to leave a message
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex justify-end gap-3">
                <MotionButton
                    type="button"
                    size="sm"
                    disabled={isPending}
                    onClick={handleLogin}
                >
                    <Show when={isPending} fallback="Sign In">
                        <SpinnerGap className="mr-2 size-4" /> Signing In...
                    </Show>
                </MotionButton>
            </div>
        </div>
    );
}
