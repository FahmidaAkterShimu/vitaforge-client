"use server";

// Trianer Forum Posts
export const getTrainerForumPosts = async (trainerId) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/forum-posts?trainerId=${trainerId}`
    );

    return response.json();
};