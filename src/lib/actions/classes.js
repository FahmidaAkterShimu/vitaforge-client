"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { serverMutation } from "../core/server";

// Create new class
export const createClass = async (classData) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const data = {
        ...classData,
        trainerId: session.user.id,
        trainerName: session.user.name,
    };

    return serverMutation("/api/classes", data);
};

// Update class
export const updateClass = async (classId, updatedClass) => {
    return serverMutation(`/api/classes/${classId}`, updatedClass, "PATCH");
};

// Delete class
export const deleteClass = async (classId) => {
    return serverMutation(`/api/classes/${classId}`, undefined, "DELETE");
};