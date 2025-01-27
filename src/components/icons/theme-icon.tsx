"use client";

import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";

export default function ThemeIcon({ className }: { className?: string }) {
    const { resolvedTheme } = useTheme();

    const iconVariants = {
        dark: {
            rotate: 0,
        },
        light: {
            rotate: 180,
        },
    };

    return (
        <motion.span
            variants={iconVariants}
            initial={{ rotate: 0 }}
            animate={resolvedTheme}
            className={cn("size-full", className)}
        >
            <MoonIcon className="hidden size-full dark:block" />
            <SunIcon className="size-full dark:hidden" />
        </motion.span>
    );
}
