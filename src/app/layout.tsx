/* eslint-disable @next/next/no-img-element */
import "@/styles/globals.css";

import { Suspense } from "react";
import type { Metadata } from "next";

import { inter, arizonia } from "@/components/typography/fonts";
import { cn } from "@/lib/utils";
import Providers from "./providers";
import Navbar from "@/components/layouts/navbar";
import StarsBackground from "@/components/ui/background/stars";
import CustomCursor from "@/components/features/custom-cursor";

export function generateMetadata(): Metadata {
    return {
        title: {
            default: "Yadhst",
            template: "%s ─ Yadhst",
        },
    };
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={cn(
                    inter.variable,
                    "relative overflow-y-scroll font-sans antialiased"
                )}
            >
                <Providers>
                    <div className="fixed inset-x-0 top-0 z-50 flex justify-center border-b border-border bg-background/5 px-4 py-1.5 backdrop-blur">
                        <span
                            className={cn(
                                arizonia.className,
                                "pointer-events-none text-xl leading-none tracking-wider"
                            )}
                        >
                            yadh
                        </span>
                    </div>
                    <Navbar />
                    <main className="mx-auto h-full min-h-screen w-full min-w-0 px-4 pb-24 pt-16 md:max-w-2xl">
                        {children}
                    </main>
                    <StarsBackground />
                    <Suspense>
                        <CustomCursor />
                    </Suspense>
                </Providers>
            </body>
        </html>
    );
}
