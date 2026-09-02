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
    }

    return serverMutation('/api/classes', data);
};

// Update class
export const updateClass = async (classId, updatedClass) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/classes/${classId}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedClass),
        }
    );

    return response.json();
};

// Delete class
export const deleteClass = async (classId) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/classes/${classId}`,
        {
            method: "DELETE",
        }
    );

    return response.json();
};

// Get class
export const getTrainerClasses = async (trainerId) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/classes?trainerId=${trainerId}`,
        {
            cache: "no-store",
        }
    );

    if (!response.ok) {
        throw new Error("Failed to load trainer classes");
    }

    return response.json();
};