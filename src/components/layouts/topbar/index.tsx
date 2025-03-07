"use client";

import { usePathname } from "next/navigation";

import style from "./style.module.scss";
import { NAVIGATIONS } from "@/lib/constants";
import { arizonia } from "@/components/typography/fonts";
import { cn } from "@/lib/utils";

export default function Topbar() {
    const pathname = usePathname();
    const isValidRoute = NAVIGATIONS.some(
        ({ href }) => href !== "/" && pathname.startsWith(href)
    );

    const path =
        pathname === "/"
            ? "home"
            : !isValidRoute
              ? "not-found"
              : pathname.split("/")[1];

    return (
        <div className={style.topbar}>
            <div className={style.container}>
                <div className={style.headline}>
                    <span className={cn(arizonia.className, style.logo)}>
                        yadh
                    </span>
                    <span className={style.path}>╱ {path}</span>
                </div>
            </div>
        </div>
    );
}
