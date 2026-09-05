"use server";

import { serverFetch } from "../core/server";

// Trainer's own forum posts
export const getTrainerForumPosts = async (trainerId) => {
    return serverFetch(`/api/forum-posts?trainerId=${trainerId}`);
};

// Latest forum posts for home page
export const getLatestForumPosts = async (limit = 3) => {
    return serverFetch(`/api/forum-posts?limit=${limit}`);
};

// All forum posts for community page
export const getAllForumPosts = async () => {
    return serverFetch("/api/forum-posts");
};

// Single forum post
export const getForumPostById = async (postId) => {
    return serverFetch(`/api/forum-posts/${postId}`);
};

// Get votes
export const getForumVotes = async (postId) => {
    return serverFetch(`/api/forum-posts/${postId}/votes`);
};

// Vote
export const voteForumPost = async (postId, voteData) => {
    return serverMutation(
        `/api/forum-posts/${postId}/vote`,
        voteData
    );
};

// Get comments
export const getForumComments = async (postId) => {
    return serverFetch(`/api/forum-posts/${postId}/comments`);
};
