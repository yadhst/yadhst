"use client";

import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useEventListener } from "usehooks-ts";
import { encode } from "querystring";
import { motion, useMotionValue, useSpring } from "framer-motion";

import { cn, createPreviewLinkURL } from "@/lib/utils";

const DEFAULT_CURSOR_SIZE = 10;
const DEFAULT_TAIL_SIZE = DEFAULT_CURSOR_SIZE * 4;
const INTERACTIVE_TAIL_SIZE = DEFAULT_TAIL_SIZE * 1.6;
const PRESSED_TAIL_SIZE = DEFAULT_TAIL_SIZE * 1.3;
const THUMBNAIL_WIDTH = 256;
const THUMBNAIL_HEIGHT = (THUMBNAIL_WIDTH * 9) / 16; // with ratio 16:9

export default function CustomCursor() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);

    const smoothOptions = { mass: 0.5, stiffness: 300, damping: 20 };
    const cursorOpacity = useSpring(1, smoothOptions);
    const tailWidth = useSpring(DEFAULT_TAIL_SIZE, smoothOptions);
    const tailHeight = useSpring(DEFAULT_TAIL_SIZE, smoothOptions);
    const tailX = useSpring(cursorX, smoothOptions);
    const tailY = useSpring(cursorY, smoothOptions);

    const [thumbnail, setThumbnail] = useState<string | null>(null);

    function updateTailSize(width: number, height: number = width) {
        return tailWidth.set(width), tailHeight.set(height);
    }

    useEffect(() => {
        setThumbnail(null);

        /** invalidate tail size on route change to prevent bug */
        const target = document.elementFromPoint(cursorX.get(), cursorY.get());
        if (target) {
            const invalidatedTailSize = isInteractiveTarget(target)
                ? INTERACTIVE_TAIL_SIZE
                : DEFAULT_TAIL_SIZE;

            return updateTailSize(invalidatedTailSize);
        }

        return updateTailSize(DEFAULT_TAIL_SIZE);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname, searchParams]);

    function handleMouseHover(isOut: boolean, e: MouseEvent) {
        const target = e.target as Element;
        if (!target || !isInteractiveTarget(target)) return;

        const anchorEl = target.closest("a[href]") as HTMLAnchorElement;
        if (anchorEl) {
            const href = anchorEl.getAttribute("href");
            if (href?.startsWith("http")) {
                const previewLinkURL = createPreviewLinkURL(
                    href,
                    THUMBNAIL_WIDTH * 3,
                    THUMBNAIL_HEIGHT * 3
                );

                setThumbnail(isOut ? null : previewLinkURL);
                return updateTailSize(
                    isOut ? DEFAULT_TAIL_SIZE : THUMBNAIL_WIDTH,
                    isOut ? DEFAULT_TAIL_SIZE : THUMBNAIL_HEIGHT
                );
            }
        }

        return updateTailSize(
            isOut ? DEFAULT_TAIL_SIZE : INTERACTIVE_TAIL_SIZE
        );
    }

    function handleMousePress(isPressed: boolean, e: MouseEvent) {
        const previousTailSize = isInteractiveTarget(e.target as Element)
            ? INTERACTIVE_TAIL_SIZE
            : DEFAULT_TAIL_SIZE;

        return updateTailSize(isPressed ? PRESSED_TAIL_SIZE : previousTailSize);
    }

    function handleMouseInOut(isOut: boolean, e: MouseEvent) {
        if (e.relatedTarget) return;

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

    useEventListener("mousemove", handleMouseMove);
    useEventListener("mouseover", handleMouseOver);
    useEventListener("mouseout", handleMouseOut);
    useEventListener("mouseup", handleMouseUp);
    useEventListener("mousedown", handleMouseDown);

    return (
        <Fragment>
            <motion.div
                className={cn(
                    "pointer-events-none fixed left-0 top-0 z-[9999] hidden -translate-x-1/2 -translate-y-1/2 [@media_(pointer:_fine)]:block",
                    !thumbnail && "rounded-full bg-white mix-blend-difference"
                )}
                style={{
                    width: tailWidth,
                    height: tailHeight,
                    top: tailY,
                    left: tailX,
                    opacity: cursorOpacity,
                }}
            >
                {!!thumbnail && (
                    <Image
                        alt="thumbnail"
                        src={thumbnail}
                        width={THUMBNAIL_WIDTH}
                        height={THUMBNAIL_HEIGHT}
                        placeholder="blur"
                        blurDataURL="/images/thumbnail-loading.jpg"
                        className="pointer-events-none size-full border-border object-cover"
                        onError={() =>
                            setThumbnail(
                                (prev) => prev && "/images/thumbnail-error.jpg"
                            )
                        }
                    />
                )}
            </motion.div>
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

function isInteractiveTarget(target: Element) {
    const interactiveQueries = [
        "a[href]",
        "button",
        "[role='button']",
        "[data-interactive-cc]",
        "[data-radix-collection-item]",
        "[data-state]",
    ];

    const interactiveQuery = interactiveQueries.join(", ");
    return Boolean(target.closest(interactiveQuery));
}
