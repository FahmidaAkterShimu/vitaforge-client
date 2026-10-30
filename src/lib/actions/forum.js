"use server";

import { serverMutation } from "../core/server";

// Create Forum Post
export const createForumPost = async (postData) => {
    return serverMutation("/api/forum-posts", postData);
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
            cache: "no-store",
        }
    );

    return response.json();
};

// Vote (like / dislike)
export const voteForumPost = async (postId, voteData) => {
    return serverMutation(
        `/api/forum-posts/${postId}/vote`,
        voteData
    );
};

// Create comment/reply
export const createForumComment = async (postId, commentData) => {
    return serverMutation(
        `/api/forum-posts/${postId}/comments`,
        commentData
    );
};

// Edit comment
export const updateForumComment = async (commentId, commentData) => {
    return serverMutation(
        `/api/forum-comments/${commentId}`,
        commentData,
        "PATCH"
    );
};

// Delete comment
export const deleteForumComment = async (commentId, userId) => {
    return serverMutation(
        `/api/forum-comments/${commentId}`,
        { userId },
        "DELETE"
    );
};