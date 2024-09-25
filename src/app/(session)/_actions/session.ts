"use server";

import { signIn, signOut } from "@/lib/auth";

export async function login() {
    return await signIn("google");
}

export async function logout() {
    return await signOut();
}
