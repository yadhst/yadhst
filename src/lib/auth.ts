import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";

import prisma from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
    debug: process.env.NODE_ENV === "development",
    adapter: PrismaAdapter(prisma),
    secret: process.env.AUTH_SECRET,
    trustHost: true,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],

    callbacks: {
        jwt({ token, user }) {
            if (user) token.id = user.id;

            return token;
        },

        session({ session, token }) {
            session.user.id = token.id as string;
            return session;
        },
    },

    session: {
        strategy: "jwt",
    },
});
