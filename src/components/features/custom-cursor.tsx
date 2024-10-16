"use client";

import { Fragment, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, useMotionValue, useSpring } from "framer-motion";

const DEFAULT_CURSOR_SIZE = 10;
const DEFAULT_TAIL_SIZE = DEFAULT_CURSOR_SIZE * 4;
const INTERACTIVE_TAIL_SIZE = DEFAULT_TAIL_SIZE * 1.6;
const PRESSED_TAIL_SIZE = DEFAULT_TAIL_SIZE * 1.3;

export default function CustomCursor() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);

    const smoothOptions = { mass: 0.5, stiffness: 300, damping: 20 };
    const cursorOpacity = useSpring(1, smoothOptions);
    const tailSize = useSpring(DEFAULT_TAIL_SIZE, smoothOptions);
    const tailX = useSpring(cursorX, smoothOptions);
    const tailY = useSpring(cursorY, smoothOptions);

    function isInteractiveTarget(target: Element) {
        const interactiveQueries = [
            "a[href]",
            "button",
            "[role='button']",
            "[data-interactive-cc]",
        ];

        const interactiveQuery = interactiveQueries.join(", ");
        return Boolean(target.closest(interactiveQuery));
    }

    useEffect(() => {
        function handleMouseHover(isOut: boolean, e: MouseEvent) {
            if (!isInteractiveTarget(e.target as Element)) return;

            return tailSize.set(
                isOut ? DEFAULT_TAIL_SIZE : INTERACTIVE_TAIL_SIZE
            );
        }

        function handleMousePress(isPressed: boolean, e: MouseEvent) {
            const previousTailSize = isInteractiveTarget(e.target as Element)
                ? INTERACTIVE_TAIL_SIZE
                : DEFAULT_TAIL_SIZE;

            return tailSize.set(
                isPressed ? PRESSED_TAIL_SIZE : previousTailSize
            );
        }

        function handleMouseInOut(isOut: boolean, e: MouseEvent) {
            if (
                e.relatedTarget &&
                "nodeName" in e.relatedTarget &&
                typeof e.relatedTarget.nodeName === "string" &&
                e.relatedTarget.nodeName !== "HTML"
            )
                return;

            return cursorOpacity.set(isOut ? 0 : 1);
        }

        function handleMouseMove(e: MouseEvent) {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        }

        function handleMouseUp(e: MouseEvent) {
            handleMousePress(false, e);
        }

        function handleMouseDown(e: MouseEvent) {
            handleMousePress(true, e);
        }

        function handleMouseOver(e: MouseEvent) {
            handleMouseInOut(false, e);
            handleMouseHover(false, e);
        }

        function handleMouseOut(e: MouseEvent) {
            handleMouseInOut(true, e);
            handleMouseHover(true, e);
        }

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseover", handleMouseOver);
        window.addEventListener("mouseout", handleMouseOut);
        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("mousedown", handleMouseDown);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
            window.removeEventListener("mouseout", handleMouseOut);
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("mousedown", handleMouseDown);
        };
    }, [cursorX, cursorY, cursorOpacity, tailSize]);

    /** invalidate tail size on route change to prevent bug */
    useEffect(() => {
        const target = document.elementFromPoint(cursorX.get(), cursorY.get());
        if (target) {
            const invalidatedTailSize = isInteractiveTarget(target as Element)
                ? INTERACTIVE_TAIL_SIZE
                : DEFAULT_TAIL_SIZE;

            return tailSize.set(invalidatedTailSize);
        }

        return tailSize.set(DEFAULT_TAIL_SIZE);
    }, [pathname, searchParams, tailSize, cursorX, cursorY]);

    return (
        <Fragment>
            <motion.div
                className="pointer-events-none fixed left-0 top-0 z-[9999] hidden -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference [@media_(pointer:_fine)]:block"
                style={{
                    width: tailSize,
                    height: tailSize,
                    top: tailY,
                    left: tailX,
                    opacity: cursorOpacity,
                }}
            ></motion.div>
            <motion.div
                className="pointer-events-none fixed left-0 top-0 z-[9999] hidden -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference [@media_(pointer:_fine)]:block"
                style={{
                    width: DEFAULT_CURSOR_SIZE,
                    height: DEFAULT_CURSOR_SIZE,
                    top: cursorY,
                    left: cursorX,
                    opacity: cursorOpacity,
                }}
            ></motion.div>
        </Fragment>
    );
}
