"use server";

import { serverFetch } from "../core/server";
import getUserSession from "../core/session";

export const getUserTrainerApplication = async () => {
    const user = await getUserSession();

    if (!user?.id) {
        throw new Error("Unauthorized");
    }

    return serverFetch(
        `/api/trainer-applications/user/${user.id}`
    );
};

export const getUserBookings = async () => {
    const user = await getUserSession();

    if (!user?.id) {
        throw new Error("Unauthorized");
    }

    return serverFetch(`/api/bookings/user/${user.id}`);
};

export const getUserFavorites = async () => {
    const user = await getUserSession();

    if (!user?.id) {
        throw new Error("Unauthorized");
    }

    return serverFetch(`/api/favorites/user/${user.id}`);
};