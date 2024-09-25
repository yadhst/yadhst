"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TokensIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";

type FloatingDockMobileProps = {
    children: React.ReactNode[];
    className?: string;
};
export function FloatingDockMobile({
    children,
    className,
}: FloatingDockMobileProps) {
    const [open, setOpen] = useState(false);

    return (
        <div className={cn("relative block md:hidden", className)}>
            <AnimatePresence>
                {open && (
                    <motion.div
                        layoutId="nav"
                        className="absolute inset-x-0 bottom-full z-20 mb-2 flex flex-col gap-2"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
            <motion.button
                type="button"
                className="flex size-10 items-center justify-center rounded-full border border-border bg-secondary text-secondary-foreground shadow-sm"
                initial={{ rotate: 0 }}
                animate={{ rotate: open ? 135 : 0 }}
                onClick={() => setOpen((prev) => !prev)}
            >
                <TokensIcon className="size-5" />
                <span className="sr-only">Toggle Navigation</span>
            </motion.button>
        </div>
    );
}

type DockMobileItemProps = {
    title: string;
    icon: React.ReactNode;
    index: number;
    max: number;
    className?: string;
};
export function DockMobileItem({
    title,
    icon,
    index,
    max,
    className,
}: DockMobileItemProps) {
    return (
        <motion.div
            key={title}
            initial={{ opacity: 0, y: 10 }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            exit={{
                opacity: 0,
                y: 10,
                transition: {
                    delay: index * 0.05,
                },
            }}
            transition={{
                delay: (max - 1 - index) * 0.05,
            }}
            className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full border border-border bg-secondary text-secondary-foreground shadow-sm",
                className
            )}
        >
            <div className="h-4 w-4">{icon}</div>
        </motion.div>
    );
}
