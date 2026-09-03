'use server'
import { serverMutation } from "../core/server";
import getUserSession from "../core/session";

// Create application
export const createApplication = async (newApplication) => {
    const user = await getUserSession();

    const applicationData = {
        userId: user.id,
        name: user.name,
        email: user.email,

        experience: Number(newApplication.experience),
        specialty: newApplication.specialty,
    };

    return serverMutation('/api/trainer-applications', applicationData);
}