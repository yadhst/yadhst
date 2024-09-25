"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type LinkProps = {
    label: string;
    href: URL;
};
type ProjectProps = {
    title: string;
    description: string;
    tags: string[];
    links?: LinkProps[];
};
export default function ProjectCard({
    title,
    description,
    tags,
    links,
}: ProjectProps) {
    return (
        <motion.div
            className="flex h-full flex-col rounded-lg border border-border bg-secondary text-secondary-foreground dark:border-zinc-100/10"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.3, delay: 0.15 * 3 }}
        >
            <div className="flex h-full flex-col gap-4 p-4">
                <div className="flex h-full flex-col gap-1">
                    <div>
                        <h3 className="text-xl font-bold">{title}</h3>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">
                            {description}
                        </p>
                    </div>
                </div>
                <div className="mt-auto flex flex-wrap items-center gap-2">
                    {tags.map((tag) => (
                        <button key={tag} type="button">
                            <Badge>{tag}</Badge>
                        </button>
                    ))}
                </div>
            </div>
            {!!links?.length && (
                <div className="mt-auto flex flex-wrap items-center gap-1 border-t border-border px-4 py-2 dark:border-zinc-100/10">
                    {links.map(({ label, href }) => (
                        <Button key={label} variant="link" size="sm" asChild>
                            <Link href={href} target="_blank" rel="noreferrer">
                                {label}
                            </Link>
                        </Button>
                    ))}
                </div>
            )}
        </motion.div>
    );
}
