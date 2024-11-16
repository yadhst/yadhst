"use client";

import { Fragment, Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
    HomeIcon,
    IdCardIcon,
    BackpackIcon,
    PaperPlaneIcon,
} from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import ThemeIcon from "./theme-icon";
import { MobileMenu, MobileMenuItem } from "@/components/ui/mobile-menu";
import {
    FloatingDock,
    DockItem,
    DockItemSeparator,
} from "@/components/ui/floating-dock";

export const navigations = [
    {
        title: "Home",
        href: "/",
        icon: <HomeIcon className="size-full" />,
    },
    {
        title: "About",
        href: "/about",
        icon: <IdCardIcon className="size-full" />,
    },
    {
        title: "Projects",
        href: "/projects",
        icon: <BackpackIcon className="size-full" />,
    },
    {
        title: "Messages",
        href: "/messages",
        icon: <PaperPlaneIcon className="size-full" />,
    },
] as const;

/** Floating Dock on Desktop and Menu on Mobile */
export default function Navbar() {
    const pathname = usePathname();
    const { resolvedTheme, setTheme } = useTheme();

    function toggleTheme() {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
    }

    return (
        <Fragment>
            <FloatingDock>
                {navigations.map(({ title, href, icon }) => (
                    <Link key={title} href={href} aria-label={title}>
                        <DockItem
                            title={title}
                            icon={icon}
                            className={cn(
                                pathname === href && "ring-2 ring-primary"
                            )}
                        />
                        <span className="sr-only">{title}</span>
                    </Link>
                ))}
                <DockItemSeparator />
                <button type="button" onClick={toggleTheme}>
                    <DockItem
                        title="Toggle Theme"
                        icon={<ThemeIcon className="size-full" />}
                    />
                    <span className="sr-only">Toggle Theme</span>
                </button>
            </FloatingDock>
            <Suspense>
                <MobileMenu>
                    {navigations.map(({ title, href }, index) => (
                        <Link key={title} href={href} aria-label={title}>
                            <MobileMenuItem
                                title={title}
                                index={index}
                                className={cn(
                                    pathname === href && "text-primary"
                                )}
                            />
                        </Link>
                    ))}
                </MobileMenu>
            </Suspense>
        </Fragment>
    );
}
