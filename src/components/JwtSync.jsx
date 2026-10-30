"use client";

import { useEffect, useRef } from "react";
import { useSession } from "@/lib/auth-client";

const JwtSync = () => {
    const { data: session, isPending } = useSession();
    const lastUserId = useRef(null);

    const userId = session?.user?.id || null;

    useEffect(() => {
        if (isPending) return;

        if (userId && lastUserId.current !== userId) {
            fetch("/api/jwt", { method: "POST" }).catch(() => { });
        } else if (!userId && lastUserId.current) {
            fetch("/api/jwt", { method: "DELETE" }).catch(() => { });
        }

        lastUserId.current = userId;
    }, [userId, isPending]);

    return null;
};

export default JwtSync;