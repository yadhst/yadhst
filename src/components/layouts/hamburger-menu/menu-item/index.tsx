"use client";

import { motion } from "framer-motion";

import style from "./style.module.scss";
import { poppins } from "@/components/typography/fonts";
import { menuTransition } from "../config";
import { cn } from "@/lib/utils";
import FlipText from "@/components/ui/flip-text";

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

type MenuItemProps = {
    title: string;
    index: number;
    className?: string;
};
export default function MenuItem({ className, title, index }: MenuItemProps) {
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
                className={cn(style.item_text, poppins.className, className)}
            />
        </motion.div>
    );
}
