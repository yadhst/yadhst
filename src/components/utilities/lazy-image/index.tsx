"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";

import style from "./style.module.scss";
import { cn } from "@/lib/utils";
import { SpinnerBall } from "@/components/icons/loading-icons";

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
            {!isLoaded && (
                <div className={cn(style.placeholder, isError && style.error)}>
                    {isError ? (
                        <span className="text-sm">Failed to Load Image</span>
                    ) : (
                        <SpinnerBall className="size-8" />
                    )}
                </div>
            )}
        </div>
    );
}
