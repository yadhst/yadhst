"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

import { Toaster } from "@/components/ui/sonner";

const queryClient = new QueryClient();

export default function Providers({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <QueryClientProvider client={queryClient}>
            <NextThemesProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                {children}
                <Toaster richColors closeButton />
                <ProgressBar
                    height="4px"
                    color="hsl(var(--primary))"
                    options={{ showSpinner: false }}
                    shallowRouting
                />
            </NextThemesProvider>
        </QueryClientProvider>
    );
}
