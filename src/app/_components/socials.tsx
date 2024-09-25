"use client";

import Link from "next/link";
import Image from "next/image";

import { MotionButton } from "@/components/ui/button";
import { GitHub, Threads } from "@/components/icons/brand-icons";

const SIZE_ICON = 20;
const links = [
    {
        name: "Email",
        href: "mailto:fayyadh.abdurrahman577@gmail.com",
        icon: <ImageIcon src="/icons/brand-icons/gmail.svg" />,
    },
    {
        name: "Discord",
        href: "https://discord.com/users/1116578460119355402",
        icon: <ImageIcon src="/icons/brand-icons/discord.svg" />,
    },
    {
        name: "Instagram",
        href: "https://www.instagram.com/yadhst",
        icon: <ImageIcon src="/icons/brand-icons/instagram.svg" />,
    },
    {
        name: "Threads",
        href: "https://www.threads.net/@yadhst",
        icon: <Threads size={SIZE_ICON} />,
    },
    {
        name: "GitHub",
        href: "https://github.com/yadhst",
        icon: <GitHub size={SIZE_ICON} />,
    },
];

export default function Socials() {
    return (
        <div className="flex flex-wrap items-center gap-3.5">
            {links.map(({ name, href, icon }) => {
                return (
                    <MotionButton
                        key={name}
                        className="flex gap-1.5"
                        variant="outline"
                        asChild
                    >
                        <Link
                            href={new URL(href)}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <span>{icon}</span>
                            <span>{name}</span>
                        </Link>
                    </MotionButton>
                );
            })}
        </div>
    );
}

function ImageIcon({ src }: { src: string }) {
    return (
        <Image
            alt="brand-icon"
            src={src}
            width={SIZE_ICON}
            height={SIZE_ICON}
        />
    );
}
