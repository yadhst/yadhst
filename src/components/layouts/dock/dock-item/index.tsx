import { useRef, useState } from "react";
import {
    AnimatePresence,
    motion,
    useSpring,
    useTransform,
    type MotionValue,
} from "framer-motion";

import style from "./style.module.scss";
import { cn } from "@/lib/utils";

const HOVERED_ICON_SIZE_TO_ADD = 40;

type DockItemProps = {
    title: string;
    icon: React.ReactNode;
    mouseX: MotionValue<number>;
    className?: string;
    iconSize?: number;
    isActive?: boolean;
};
export default function DockItem({
    title,
    icon,
    mouseX,
    className,
    isActive,
    iconSize = 30,
}: DockItemProps) {
    const ref = useRef<React.ComponentRef<"div">>(null);
    const [hovered, setHovered] = useState(false);
    const distance = useTransform(mouseX, (val) => {
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
        [iconSize, iconSize + HOVERED_ICON_SIZE_TO_ADD, iconSize]
    );

    const heightTransformIcon = useTransform(
        distance,
        [-150, 0, 150],
        [iconSize, iconSize + HOVERED_ICON_SIZE_TO_ADD, iconSize]
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
            className={cn(style.dock_item, className)}
        >
            <AnimatePresence>
                {hovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, x: "-50%" }}
                        animate={{ opacity: 1, y: 0, x: "-50%" }}
                        exit={{ opacity: 0, y: 2, x: "-50%" }}
                        className={style.title}
                    >
                        {title}
                    </motion.div>
                )}
            </AnimatePresence>
            <motion.div
                style={{ width: widthIcon, height: heightIcon }}
                className={style.icon}
            >
                {icon}
            </motion.div>
            {isActive && (
                <motion.div
                    layoutId="dock-active"
                    className={style.active_indicator}
                    transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 10,
                    }}
                />
            )}
        </motion.div>
    );
}
