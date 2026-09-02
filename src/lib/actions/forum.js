"use server";

// Create Forum Post
export const createForumPost = async (postData) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/forum-posts`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
        }
    );

    return response.json();
};

// Delete Forum Post
export const deleteForumPost = async (postId) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/forum-posts/${postId}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    return response.json();
};
