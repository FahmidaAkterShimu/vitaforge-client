"use server";

import { serverFetch } from "../core/server";

// Triner classes
export const getTrainerClasses = async (trainerId, status = "all") => {
    const params = new URLSearchParams();

    params.set("trainerId", trainerId);
    params.set("status", status);

    return serverFetch(`/api/classes?${params.toString()}`);
};

// Enrolled students
export const getClassStudents = async (classId) => {
    return serverFetch(`/api/classes/${classId}/students`);
};

// Get all classes for users 
export const getAllClasses = async ({
    status = "Approved",
    limit,
    sortBy,
    sortOrder,
} = {}) => {
    const params = new URLSearchParams();

    params.set("status", status);

    if (limit) {
        params.set("limit", limit);
    }

    if (sortBy) {
        params.set("sortBy", sortBy);
    }

    if (sortOrder) {
        params.set("sortOrder", sortOrder);
    }

    return serverFetch(`/api/classes?${params.toString()}`);
};

// Get single approved class 
export const getClassById = async (classId) => {
    return serverFetch(`/api/classes/${classId}`);
};