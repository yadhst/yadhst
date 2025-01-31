"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import LazyImage from "../utilities/lazy-image";
import { Badge } from "@/components/ui/badge";

type LinkProps = {
    label: string;
    href: URL;
};
type ProjectProps = {
    title: string;
    description: string;
    cover: string;
    tags: string[];
    links?: LinkProps[];
};
export default function ProjectCard({
    title,
    description,
    cover,
    tags,
    links,
}: ProjectProps) {
    return (
        <div
            className={cn(
                "dark group relative flex h-96 flex-col justify-between gap-1 overflow-hidden rounded-xl border border-border px-4 py-6",
                "[box-shadow:0_-200px_80px_-20px_hsl(var(--background))_inset]"
            )}
        >
            <div className="pointer-events-none absolute inset-0 -z-10">
                <LazyImage
                    src={cover}
                    alt="cover"
                    width={400}
                    height={400}
                    className="size-full object-cover transition-all duration-200 ease-linear group-hover:rotate-1 group-hover:scale-105"
                />
            </div>
            <div className="flex flex-wrap items-center gap-3">
                {tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                        {tag}
                    </Badge>
                ))}
            </div>
            <div
                className={cn(
                    "flex flex-col gap-5 text-foreground",
                    !!links?.length &&
                        "lg:translate-y-11 lg:transition-all lg:duration-300 lg:ease-in-out lg:group-hover:translate-y-0"
                )}
            >
                <div className="flex flex-col gap-1.5">
                    <h1 className="text-xl font-bold">{title}</h1>
                    <p className="line-clamp-3 text-sm text-muted-foreground">
                        {description}
                    </p>
                </div>
                {!!links?.length && (
                    <div className="flex flex-wrap items-center gap-5">
                        {links.map(({ label, href }) => (
                            <Link
                                key={label}
                                href={href}
                                data-thumbnail-link={href}
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs font-semibold underline underline-offset-1"
                            >
                                {label}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
