/* eslint-disable @next/next/no-img-element */
import "@/styles/globals.css";

import { Suspense } from "react";
import type { Metadata } from "next";

import { inter } from "@/components/typography/fonts";
import { METADATA } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Providers from "./providers";
import Topbar from "@/components/layouts/topbar";
import Dock from "@/components/layouts/dock";
import HamburgerMenu from "@/components/layouts/hamburger-menu";
import CustomCursor from "@/components/features/custom-cursor";

export function generateMetadata(): Metadata {
    return {
        ...METADATA,
        title: {
            default: METADATA.title,
            template: `%s ─ ${METADATA.title}`,
        },
    };
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" id="FreePalestine" suppressHydrationWarning>
            <body
                className={cn(inter.variable, "relative font-sans antialiased")}
            >
                <Providers>
                    <Topbar />
                    <Suspense>
                        <HamburgerMenu />
                    </Suspense>
                    <main className="mx-auto h-full min-h-screen w-full min-w-0 px-4 pb-24 pt-16 md:max-w-2xl">
                        {children}
                    </main>
                    <Dock />
                    <Suspense>
                        <CustomCursor />
                    </Suspense>
                </Providers>
            </body>
        </html>
    );
}
