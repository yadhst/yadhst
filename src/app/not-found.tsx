"use client";

import { useRouter, usePathname } from "next/navigation";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

import { navigations } from "@/components/layouts/navbar";
import { cn } from "@/lib/utils";
import { poppins } from "@/components/typography/fonts";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
    const router = useRouter();
    const pathname = usePathname();

    const isOnNavigation = navigations.some((n) => n.href === pathname);
    const message = isOnNavigation ? "Coming Soon" : "You're lost, aren't you?";

    return (
        <div
            className={cn(
                "absolute inset-0 flex flex-col items-center justify-center bg-background p-4 text-foreground",
                poppins.className
            )}
        >
            <div className="space-y-6 text-center">
                <h1 className="text-8xl font-thin tracking-wider">404</h1>
                <div className="mx-auto h-px w-16 bg-muted" />
                <p className="text-xl font-light">{message}</p>
            </div>
            <div className="mt-12">
                <Button
                    variant="outline"
                    className="group flex items-center gap-2"
                    onClick={() => router.push("/")}
                >
                    <ArrowLeftIcon className="size-4 transition-transform group-hover:-translate-x-1" />
                    <span>Return to Home</span>
                </Button>
            </div>
        </div>
    );
}
