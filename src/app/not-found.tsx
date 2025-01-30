import Link from "next/link";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { poppins } from "@/components/typography/fonts";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
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
                <p className="font-light">You're lost, aren't you?</p>
            </div>
            <div className="mt-8">
                <Button
                    variant="outline"
                    className="group flex items-center gap-2"
                    asChild
                >
                    <Link href="/">
                        <ArrowLeftIcon className="size-4 transition-transform group-hover:-translate-x-1" />
                        <span>Return to Home</span>
                    </Link>
                </Button>
            </div>
        </div>
    );
}
