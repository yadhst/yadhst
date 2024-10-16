import "@/styles/globals.css";

import type { Metadata } from "next";

import { inter } from "@/components/typography/fonts";
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
                    <Navbar />
                    <main className="mx-auto h-full min-h-screen w-full min-w-0 px-4 pb-24 pt-4 sm:px-8 sm:pt-12 md:max-w-2xl">
                        {children}
                    </main>
                    <StarsBackground />
                    <CustomCursor />
                </Providers>
            </body>
        </html>
    );
}
