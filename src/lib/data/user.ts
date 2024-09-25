import prisma from "../prisma";
import { auth } from "../auth";

export async function getUser(id: string) {
    const user = await prisma.user.findUnique({
        where: { id },
    });

    return user;
}

export async function getCurrentUser() {
    const session = await auth();
    const sessionUser = session?.user;
    if (!sessionUser) return null;

    return getUser(sessionUser.id!);
}
