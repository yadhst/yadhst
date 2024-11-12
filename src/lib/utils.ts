import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { encode } from "querystring";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function chunksArray<T>(array: T[], size: number) {
    return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
        array.slice(i * size, i * size + size)
    );
}

export function generateRandomString(length: number) {
    return Array.from({ length }, () => Math.random().toString(36)[2]).join("");
}

export function createPreviewLinkURL(
    url: string,
    viewportWidth: number,
    viewportHeight: number
) {
    const params = encode({
        url,
        screenshot: true,
        meta: false,
        waitForTimeout: 8000,
        embed: "screenshot.url",
        colorScheme: "dark",
        ttl: "1d",
        "viewport.isMobile": true,
        "viewport.deviceScaleFactor": 1,
        "viewport.width": viewportWidth,
        "viewport.height": viewportHeight,
    });

    return `https://api.microlink.io/?${params}`;
}
