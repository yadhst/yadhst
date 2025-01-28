"use client";

import { Fragment, useState, useEffect, useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEventListener } from "usehooks-ts";

import style from "./style.module.scss";
import { cn, createPreviewLinkURL } from "@/lib/utils";
import LazyImage from "@/components/utilities/lazy-image";

const SMOOTH_TRANSITION = { mass: 0.5, stiffness: 300, damping: 20 };
const CURSOR_SIZE = 10;
const DEFAULT_TAIL_SIZE = CURSOR_SIZE * 4;
const PRESSED_TAIL_SCALE = 1.3;
const INTERACTIVE_TAIL_SCALE = 1.6;
const THUMBNAIL_WIDTH = 256;
const THUMBNAIL_HEIGHT = (THUMBNAIL_WIDTH * 9) / 16; // with ratio 16:9

function isInteractiveTarget(target: Element) {
    const interactiveQueries = [
        "a[href]",
        "button",
        "[role='button']",
        "[data-radix-collection-item]",
        "[data-state]",
        "[data-interactive]",
        "[data-thumbnail-link]",
        "[data-thumbnail-source]",
    ];

    const interactiveQuery = interactiveQueries.join(", ");
    return Boolean(target.closest(interactiveQuery));
}

export default function InteractiveCursor() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);

    const cursorOpacity = useSpring(1, SMOOTH_TRANSITION);
    const tailScale = useSpring(1, SMOOTH_TRANSITION);
    const tailWidth = useSpring(DEFAULT_TAIL_SIZE, SMOOTH_TRANSITION);
    const tailHeight = useSpring(DEFAULT_TAIL_SIZE, SMOOTH_TRANSITION);
    const tailX = useSpring(cursorX, SMOOTH_TRANSITION);
    const tailY = useSpring(cursorY, SMOOTH_TRANSITION);

    const [thumbnail, setThumbnail] = useState<string | null>(null);

    useEffect(() => {
        setThumbnail(null);
        tailScale.set(1);
        updateTailSize(DEFAULT_TAIL_SIZE);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname, searchParams]);

    /** Helper/Reusable Functions */
    const updateTailSize = useCallback(
        (width: number, height: number = width) => {
            return tailWidth.set(width), tailHeight.set(height);
        },
        []
    );

    /** Event Functions */
    const handleMouseInOut = useCallback((isOut: boolean, e: MouseEvent) => {
        if (e.relatedTarget) return;
        return cursorOpacity.set(isOut ? 0 : 1);
    }, []);

    const handleMousePress = useCallback(
        (isPressed: boolean, e: MouseEvent) => {
            return tailScale.set(isPressed ? PRESSED_TAIL_SCALE : 1);
        },
        []
    );

    const handleMouseHover = useCallback((isOut: boolean, e: MouseEvent) => {
        const target = e.target as Element;
        if (!target || !isInteractiveTarget(target)) return;

        const thumbnailElement = target.closest(
            "[data-thumbnail-link],[data-thumbnail-source]"
        ) as HTMLElement;

        if (thumbnailElement) {
            const thumbnailWidth =
                Number(thumbnailElement.dataset.thumbnailWidth) ||
                THUMBNAIL_WIDTH;

            const thumbnailHeight =
                Number(thumbnailElement.dataset.thumbnailHeight) ||
                THUMBNAIL_HEIGHT;

            const thumbnailSource =
                thumbnailElement.dataset.thumbnailLink?.startsWith("http")
                    ? createPreviewLinkURL(
                          thumbnailElement.dataset.thumbnailLink,
                          thumbnailWidth * 3,
                          thumbnailHeight * 3
                      )
                    : thumbnailElement.dataset.thumbnailSource;

            if (thumbnailSource?.startsWith("http")) {
                setThumbnail(isOut ? null : thumbnailSource);
                return updateTailSize(
                    isOut ? DEFAULT_TAIL_SIZE : thumbnailWidth,
                    isOut ? DEFAULT_TAIL_SIZE : thumbnailHeight
                );
            }
        }

        return updateTailSize(
            isOut
                ? DEFAULT_TAIL_SIZE
                : DEFAULT_TAIL_SIZE * INTERACTIVE_TAIL_SCALE
        );
    }, []);

    /** Event Handler */
    const handleMouseMove = useCallback((e: MouseEvent) => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
    }, []);

    const handleMouseOver = useCallback((e: MouseEvent) => {
        handleMouseInOut(false, e);
        handleMouseHover(false, e);
    }, []);

    const handleMouseOut = useCallback((e: MouseEvent) => {
        handleMouseInOut(true, e);
        handleMouseHover(true, e);
    }, []);

    const handleMouseUp = useCallback((e: MouseEvent) => {
        handleMousePress(false, e);
    }, []);

    const handleMouseDown = useCallback((e: MouseEvent) => {
        handleMousePress(true, e);
    }, []);

    useEventListener("mousemove", handleMouseMove);
    useEventListener("mouseover", handleMouseOver);
    useEventListener("mouseout", handleMouseOut);
    useEventListener("mouseup", handleMouseUp);
    useEventListener("mousedown", handleMouseDown);

    return (
        <Fragment>
            <motion.div
                className={style.cursor}
                style={{
                    width: CURSOR_SIZE,
                    height: CURSOR_SIZE,
                    left: cursorX,
                    top: cursorY,
                    opacity: cursorOpacity,
                }}
            />
            <motion.div
                className={cn(
                    style.cursor,
                    !!thumbnail && style.tail_thumbnail
                )}
                style={{
                    width: tailWidth,
                    height: tailHeight,
                    left: tailX,
                    top: tailY,
                    opacity: cursorOpacity,
                    scale: tailScale,
                }}
                transformTemplate={({ scale }) =>
                    `translate(var(--tw-translate-x), var(--tw-translate-y)) scale(${scale})`
                }
            >
                {!!thumbnail && (
                    <LazyImage
                        alt="thumbnail"
                        src={thumbnail}
                        width={THUMBNAIL_WIDTH}
                        height={THUMBNAIL_HEIGHT}
                        className={style.thumbnail_image}
                    />
                )}
            </motion.div>
        </Fragment>
    );
}
