"use client";

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
import {
    FloatingDockDesktop,
    DockDesktopItem,
    DockDesktopItemSeparator,
} from "@/components/ui/floating-dock/desktop";
import {
    FloatingDockMobile,
    DockMobileItem,
} from "@/components/ui/floating-dock/mobile";

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

export default function Navbar() {
    const pathname = usePathname();
    const { resolvedTheme, setTheme } = useTheme();

    function toggleTheme() {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
    }

    return (
        <div className="fixed bottom-4 right-4 z-50 md:inset-x-1/2">
            <div className="flex items-center justify-center gap-3 max-md:flex-col-reverse">
                <FloatingDockDesktop>
                    {navigations.map(({ title, href, icon }) => (
                        <Link key={title} href={href} aria-label={title}>
                            <DockDesktopItem
                                title={title}
                                icon={icon}
                                className={cn(
                                    pathname === href && "ring-brand ring-2"
                                )}
                            />
                            <span className="sr-only">{title}</span>
                        </Link>
                    ))}
                    <DockDesktopItemSeparator />
                    <button type="button" onClick={toggleTheme}>
                        <DockDesktopItem
                            title="Toggle Theme"
                            icon={<ThemeIcon className="size-full" />}
                        />
                        <span className="sr-only">Toggle Theme</span>
                    </button>
                </FloatingDockDesktop>
                <FloatingDockMobile>
                    {navigations.map(({ title, href, icon }, index) => (
                        <Link key={title} href={href}>
                            <DockMobileItem
                                title={title}
                                icon={icon}
                                index={index}
                                max={navigations.length}
                                className={cn(
                                    pathname === href && "border-brand"
                                )}
                            />
                        </Link>
                    ))}
                </FloatingDockMobile>
                <div className="md:hidden">
                    <button
                        type="button"
                        className="flex size-10 items-center justify-center rounded-full border border-border bg-secondary text-secondary-foreground shadow-sm"
                        onClick={toggleTheme}
                    >
                        <ThemeIcon className="size-5" />
                        <span className="sr-only">Toggle Theme</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
