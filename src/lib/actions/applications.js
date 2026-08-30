'use server'
import { headers } from "next/headers";
import { auth } from "../auth";

export const createApplication = async (newApplication) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const user = session.user;

    const applicationData = {
        userId: user.id,
        name: user.name,
        email: user.email,

        experience: Number(newApplication.experience),
        specialty: newApplication.specialty,
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/trainer-applications`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(applicationData),
        });

    return res.json();
}