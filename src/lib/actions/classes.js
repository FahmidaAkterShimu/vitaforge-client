"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const createClass = async (classData) => {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user) {
            return {
                success: false,
                message: "You must be logged in.",
            };
        }

        if (session.user.role !== "trainer") {
            return {
                success: false,
                message: "Only trainers can create classes.",
            };
        }

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/classes`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...classData,
                    trainerId: session.user.id,
                    trainerName: session.user.name,
                }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message:
                    data?.message || "Failed to create class.",
            };
        }

        return {
            success: true,
            data: data.data,
        };
    } catch (error) {
        console.error("Create class action error:", error);

        return {
            success: false,
            message: "Something went wrong while creating the class.",
        };
    }
};