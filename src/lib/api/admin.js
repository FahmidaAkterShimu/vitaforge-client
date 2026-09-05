"use server";

import { serverFetch, serverMutation } from "../core/server";

export const getAdminStats = async () => {
    return serverFetch("/api/admin/stats");
};

export const getAdminUsers = async ({
    page = 1,
    limit = 10,
    search = "",
    role = "all",
} = {}) => {
    const params = new URLSearchParams({
        page,
        limit,
        search,
        role,
    });

    return serverFetch(`/api/admin/users?${params.toString()}`);
};

export const updateUserStatus = async (id, blocked) => {
    return serverMutation(
        `/api/admin/users/${id}/status`,
        { blocked },
        "PATCH"
    );
};

export const updateUserRole = async (id, role) => {
    return serverMutation(
        `/api/admin/users/${id}/role`,
        { role },
        "PATCH"
    );
};

export const getTrainerApplications = async () => {
    return serverFetch(
        "/api/admin/trainer-applications"
    );
};

export const approveTrainerApplication = async (id) => {
    return serverMutation(
        `/api/admin/trainer-applications/${id}/approve`,
        {},
        "PATCH"
    );
};

export const rejectTrainerApplication = async (
    id,
    feedback
) => {
    return serverMutation(
        `/api/admin/trainer-applications/${id}/reject`,
        { feedback },
        "PATCH"
    );
};

export const getAdminTrainers = async () => {
    return serverFetch("/api/admin/trainers");
};

export const demoteTrainer = async (id) => {
    return serverMutation(
        `/api/admin/trainers/${id}/demote`,
        {},
        "PATCH"
    );
};

export const getAdminClasses = async ({
    page = 1,
    limit = 10,
    search = "",
    status = "all",
} = {}) => {
    const params = new URLSearchParams({
        page,
        limit,
        search,
        status,
    });

    return serverFetch(
        `/api/admin/classes?${params.toString()}`
    );
};

export const updateAdminClassStatus = async (
    id,
    status
) => {
    return serverMutation(
        `/api/admin/classes/${id}/status`,
        { status },
        "PATCH"
    );
};

export const deleteAdminClass = async (id) => {
    return serverMutation(
        `/api/admin/classes/${id}`,
        {},
        "DELETE"
    );
};

export const getAdminForumPosts = async () => {
    return serverFetch("/api/admin/forum");
};

export const deleteAdminForumPost = async (id) => {
    return serverMutation(
        `/api/admin/forum/${id}`,
        {},
        "DELETE"
    );
};

export const getAdminTransactions = async () => {
    return serverFetch("/api/admin/transactions");
};