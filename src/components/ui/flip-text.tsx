"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

const DURATION = 0.25;
const STAGGER = 0.025;

type FlipTextProps = {
    text: string;
    className?: string;
};
export default function FlipText({ text, className }: FlipTextProps) {
    return (
        <motion.div
            className={cn(
                "relative block overflow-hidden whitespace-nowrap",
                className
            )}
            initial="initial"
            whileHover="hovered"
        >
            <div>
                {text.split("").map((l, i) => (
                    <motion.span
                        variants={{
                            initial: {
                                y: 0,
                            },
                            hovered: {
                                y: "-100%",
                            },
                        }}
                        transition={{
                            duration: DURATION,
                            ease: "easeInOut",
                            delay: STAGGER * i,
                        }}
                        className="inline-block"
                        key={i}
                    >
                        {l}
                    </motion.span>
                ))}
            </div>
            <div className="absolute inset-0">
                {text.split("").map((l, i) => (
                    <motion.span
                        variants={{
                            initial: {
                                y: "100%",
                            },
                            hovered: {
                                y: 0,
                            },
                        }}
                        transition={{
                            duration: DURATION,
                            ease: "easeInOut",
                            delay: STAGGER * i,
                        }}
                        className="inline-block"
                        key={i}
                    >
                        {l}
                    </motion.span>
                ))}
            </div>
        </motion.div>
    );
}
