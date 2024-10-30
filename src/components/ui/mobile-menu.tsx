"use client";

import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { TokensIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { poppins } from "@/components/typography/fonts";
import ThemeIcon from "@/components/layouts/navbar/theme-icon";
import FlipText from "./flip-text";

const menuTransition = {
    duration: 0.55,
    type: "tween",
    ease: [0.76, 0, 0.24, 1],
};
const menuVariants = {
    open: {
        clipPath: "circle(150% at calc(100% - 2.5rem) calc(100% - 2.5rem))",
    },
    closed: {
        clipPath: "circle(0% at calc(100% - 2.5rem) calc(100% - 2.5rem))",
        transition: {
            delay: 0.4,
        },
    },
};

export function MobileMenu({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [open, setOpen] = useState(false);
    const { resolvedTheme, setTheme } = useTheme();

    function toggleTheme() {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
    }

    useEffect(() => {
        setOpen(false);
    }, [pathname, searchParams]);

    return (
        <div className="lg:hidden">
            <div className="fixed bottom-4 right-4 z-50">
                <div className="flex flex-col-reverse gap-3">
                    <motion.button
                        type="button"
                        className="flex size-10 items-center justify-center rounded-full border border-border bg-secondary text-secondary-foreground shadow-sm"
                        initial={{ rotate: 0 }}
                        animate={{ rotate: open ? 135 : 0 }}
                        transition={{
                            ...menuTransition,
                            delay: open ? 0 : 0.4,
                        }}
                        onClick={() => setOpen((prev) => !prev)}
                    >
                        <TokensIcon className="size-5" />
                        <span className="sr-only">Toggle Navigation</span>
                    </motion.button>
                    <button
                        type="button"
                        className="flex size-10 items-center justify-center rounded-full border border-border bg-secondary text-secondary-foreground shadow-sm"
                        onClick={toggleTheme}
                    >
                        <ThemeIcon className="size-5" />
                        <span className="sr-only">Toggle Theme</span>
                    </button>
                </div>
            </div>
            <motion.nav
                className="fixed z-40 flex h-screen w-screen justify-center bg-background/10 px-4 py-24 backdrop-blur-2xl"
                variants={menuVariants}
                animate={open ? "open" : "closed"}
                initial="closed"
                transition={menuTransition}
            >
                <AnimatePresence>
                    {open && (
                        <div className="flex flex-col items-center gap-10">
                            {children}
                        </div>
                    )}
                </AnimatePresence>
            </motion.nav>
        </div>
    );
}

const itemVariants = {
    initial: {
        opacity: 0,
        skewX: -40,
    },
    enter: (index: number) => ({
        opacity: 1,
        skewX: 0,
        transition: {
            delay: (index + 1) * 0.3,
        },
    }),
    exit: {
        opacity: 0,
        skewX: -10,
    },
};

type MobileMenuItemProps = {
    title: string;
    index: number;
    className?: string;
};
export function MobileMenuItem({
    className,
    title,
    index,
}: MobileMenuItemProps) {
    return (
        <motion.div
            custom={index}
            variants={itemVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            transition={menuTransition}
        >
            <FlipText
                text={title}
                className={cn(
                    "text-4xl font-extrabold uppercase tracking-widest md:text-6xl",
                    poppins.className,
                    className
                )}
            />
        </motion.div>
    );
}
