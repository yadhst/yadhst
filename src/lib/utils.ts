import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
