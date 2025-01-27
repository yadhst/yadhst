"use client";
/** Navigation Menu for Desktop */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, useMotionValue } from "framer-motion";
import {
    FcHome,
    FcBusinessContact,
    FcFolder,
    FcFeedback,
} from "react-icons/fc";

import style from "./style.module.scss";
import { NAVIGATIONS } from "@/lib/constants";
import DockItem from "./dock-item";
import DockSeparator from "./dock-separator";
import ThemeIcon from "@/components/icons/theme-icon";

const NAVIGATIONS_ICONS = {
    Home: FcHome,
    About: FcBusinessContact,
    Projects: FcFolder,
    Messages: FcFeedback,
};

export default function Dock() {
    const pathname = usePathname();
    const mouseX = useMotionValue(Infinity);
    const { resolvedTheme, setTheme } = useTheme();

    function toggleTheme() {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
    }

    function getIcon(title: keyof typeof NAVIGATIONS_ICONS) {
        const Icon = NAVIGATIONS_ICONS[title];
        return <Icon className="size-full" />;
    }

    return (
        <div className={style.dock_container}>
            <motion.div
                onMouseMove={(e) => mouseX.set(e.pageX)}
                onMouseLeave={() => mouseX.set(Infinity)}
                className={style.dock}
            >
                {NAVIGATIONS.map(({ title, href }) => (
                    <Link key={title} href={href} aria-label={title}>
                        <DockItem
                            title={title}
                            icon={getIcon(title)}
                            mouseX={mouseX}
                            isActive={pathname === href}
                        />
                        <span className="sr-only">{title}</span>
                    </Link>
                ))}
                <DockSeparator />
                <button
                    type="button"
                    onClick={toggleTheme}
                    aria-label="Toggle Theme"
                >
                    <DockItem
                        title="Toggle Theme"
                        mouseX={mouseX}
                        iconSize={20}
                        icon={<ThemeIcon className="size-full" />}
                    />
                    <span className="sr-only">Toggle Theme</span>
                </button>
            </motion.div>
        </div>
    );
}
