"use client";

import { createContext, useContext, useRef, useState } from "react";
import {
    AnimatePresence,
    motion,
    useSpring,
    useTransform,
    useMotionValue,
    type MotionValue,
} from "framer-motion";

import { cn } from "@/lib/utils";

const DockContext = createContext<{
    mouseX: MotionValue<number>;
} | null>(null);

type FloatingDockProps = {
    children: React.ReactNode;
    className?: string;
};
export function FloatingDock({ children, className }: FloatingDockProps) {
    const mouseX = useMotionValue(Infinity);

    return (
        <DockContext.Provider value={{ mouseX }}>
            <div className="fixed inset-x-0 bottom-4 z-50 hidden justify-center lg:flex">
                <motion.div
                    onMouseMove={(e) => mouseX.set(e.pageX)}
                    onMouseLeave={() => mouseX.set(Infinity)}
                    className={cn(
                        "flex h-16 items-end gap-4 rounded-3xl border border-border bg-background px-4 py-3 shadow-lg dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
                        className
                    )}
                >
                    {children}
                </motion.div>
            </div>
        </DockContext.Provider>
    );
}

type DockItemProps = {
    title: string;
    icon: React.ReactNode;
    className?: string;
};
export function DockItem({ title, icon, className }: DockItemProps) {
    const ref = useRef<React.ElementRef<"div">>(null);
    const [hovered, setHovered] = useState(false);
    const context = useContext(DockContext)!;
    const distance = useTransform(context.mouseX, (val) => {
        const bounds = ref.current?.getBoundingClientRect() ?? {
            x: 0,
            width: 0,
        };

        return val - bounds.x - bounds.width / 2;
    });

    const widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
    const heightTransform = useTransform(
        distance,
        [-150, 0, 150],
        [40, 80, 40]
    );

    const widthTransformIcon = useTransform(
        distance,
        [-150, 0, 150],
        [20, 40, 20]
    );

    const heightTransformIcon = useTransform(
        distance,
        [-150, 0, 150],
        [20, 40, 20]
    );

    const width = useSpring(widthTransform, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });

    const height = useSpring(heightTransform, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });

    const widthIcon = useSpring(widthTransformIcon, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });

    const heightIcon = useSpring(heightTransformIcon, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });

    return (
        <motion.div
            ref={ref}
            style={{ width, height }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={cn(
                "relative flex aspect-square items-center justify-center rounded-full bg-foreground/5 text-foreground/70 backdrop-blur-sm",
                className
            )}
        >
            <AnimatePresence>
                {hovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, x: "-50%" }}
                        animate={{ opacity: 1, y: 0, x: "-50%" }}
                        exit={{ opacity: 0, y: 2, x: "-50%" }}
                        className="absolute -top-8 left-1/2 w-fit -translate-x-1/2 whitespace-pre rounded-md border border-border bg-background px-2 py-0.5 text-xs text-foreground/70"
                    >
                        {title}
                    </motion.div>
                )}
            </AnimatePresence>
            <motion.div
                style={{ width: widthIcon, height: heightIcon }}
                className="flex items-center justify-center"
            >
                {icon}
            </motion.div>
        </motion.div>
    );
}

export function DockItemSeparator() {
    return <div className="h-5 w-px self-center bg-border"></div>;
}
