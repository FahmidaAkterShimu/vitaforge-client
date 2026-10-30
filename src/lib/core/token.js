import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import getUserSession from "./session";

export const TOKEN_COOKIE = "token";

export const signToken = (user) =>
    jwt.sign(
        { id: String(user.id), email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

export const getServerToken = async () => {
    const user = await getUserSession();

    if (!user?.id) return null;

    const cookieStore = await cookies();
    const existing = cookieStore.get(TOKEN_COOKIE)?.value;

    if (existing) {
        try {
            const decoded = jwt.verify(existing, process.env.JWT_SECRET);

            if (decoded.id === String(user.id)) {
                return existing;
            }
        } catch (error) {
        }
    }

    return signToken(user);
};