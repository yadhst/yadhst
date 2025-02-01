"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";

import style from "./style.module.scss";
import { cn } from "@/lib/utils";
import { SpinnerBall } from "@/components/icons/loading-icons";
import { Show } from "@/components/utilities/conditional";

type LazyImageProps = Omit<ImageProps, "unoptimized" | "loading">;
export default function LazyImage({
    onLoad,
    onError,
    ...props
}: LazyImageProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isError, setIsError] = useState(false);

    return (
        <div className={style.image_container}>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image
                {...props}
                unoptimized
                loading="lazy"
                onLoad={(...args) => {
                    onLoad?.(...args);
                    setIsLoaded(true);
                }}
                onError={(...args) => {
                    onError?.(...args);
                    setIsError(true);
                }}
            />
            <Show when={!isLoaded}>
                <div className={cn(style.placeholder, isError && style.error)}>
                    <Show
                        when={isError}
                        fallback={<SpinnerBall className="size-8" />}
                    >
                        <span className="text-sm">Failed to Load Image</span>
                    </Show>
                </div>
            </Show>
        </div>
    );
}
