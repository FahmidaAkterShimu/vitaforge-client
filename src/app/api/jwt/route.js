import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { signToken, TOKEN_COOKIE } from "@/lib/core/token";

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
};

export async function POST() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        return NextResponse.json(
            { success: false, message: "Unauthorized" },
            { status: 401 }
        );
    }

    const response = NextResponse.json({ success: true });

    response.cookies.set(TOKEN_COOKIE, signToken(session.user), cookieOptions);

    return response;
}

export async function DELETE() {
    const response = NextResponse.json({ success: true });

    response.cookies.set(TOKEN_COOKIE, "", { ...cookieOptions, maxAge: 0 });

    return response;
}