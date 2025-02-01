"use client";
/** Navigation Menu for Tablet Resolution and Below */

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { RxTokens } from "react-icons/rx";

import style from "./style.module.scss";
import { NAVIGATIONS } from "@/lib/constants";
import { menuTransition } from "./config";
import { cn } from "@/lib/utils";
import MenuItem from "./menu-item";
import ThemeIcon from "@/components/icons/theme-icon";
import { Show } from "@/components/utilities/conditional";

const menuVariants = {
    open: {
        clipPath: "circle(150% at calc(100% - 2.5rem) calc(100% - 2.5rem))",
    },
    closed: {
        clipPath: "circle(0% at calc(100% - 2.5rem) calc(100% - 2.5rem))",
        transition: {
            delay: 0.4,
        },
    },
};

export default function HamburgerMenu() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [opened, setOpened] = useState(false);
    const { resolvedTheme, setTheme } = useTheme();

    function toggleTheme() {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
    }

    useEffect(() => {
        setOpened(false);
    }, [pathname, searchParams]);

    return (
        <div className={style.mobile_menu}>
            <div className={style.mobile_menu_container}>
                <div className={style.items}>
                    <motion.button
                        type="button"
                        initial={{ rotate: 0 }}
                        animate={{ rotate: opened ? 135 : 0 }}
                        transition={{
                            ...menuTransition,
                            delay: opened ? 0 : 0.4,
                        }}
                        onClick={() => setOpened((prev) => !prev)}
                    >
                        <RxTokens className="size-5" />
                        <span className="sr-only">Toggle Navigation</span>
                    </motion.button>
                    <button type="button" onClick={toggleTheme}>
                        <ThemeIcon className="size-5" />
                        <span className="sr-only">Toggle Theme</span>
                    </button>
                </div>
            </div>
            <motion.nav
                className={style.hamburger_menu}
                variants={menuVariants}
                animate={opened ? "open" : "closed"}
                initial="closed"
                transition={menuTransition}
            >
                <AnimatePresence>
                    <Show key={`${opened}`} when={opened}>
                        <div className={style.items}>
                            {NAVIGATIONS.map(({ title, href }, index) => (
                                <Link
                                    key={title}
                                    href={href}
                                    aria-label={title}
                                >
                                    <MenuItem
                                        title={title}
                                        index={index}
                                        className={cn(
                                            pathname === href && "text-primary"
                                        )}
                                    />
                                </Link>
                            ))}
                        </div>
                    </Show>
                </AnimatePresence>
            </motion.nav>
        </div>
    );
}
