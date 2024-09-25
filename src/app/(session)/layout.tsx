import { getCurrentUser } from "@/lib/data/user";
import { CurrentUserProvider } from "@/contexts/current-user-context";

export default async function SessionLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const user = await getCurrentUser();
    return (
        <CurrentUserProvider payloadUser={user}>{children}</CurrentUserProvider>
    );
}
