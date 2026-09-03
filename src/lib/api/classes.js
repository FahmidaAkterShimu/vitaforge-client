"use server";

import { serverFetch } from "../core/server";

// Triner classes
export const getTrainerClasses = async (trainerId, status = "Pending") => {
    return serverFetch(`/api/classes?trainerId=${trainerId}&status=${status}`)
};

// Enrolled students
export const getClassStudents = async (classId) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/classes/${classId}/students`
    );

    return response.json();
};

// Get all classes for users 
export const getAllClasses = async (status = "Approved") => {
    return serverFetch(`/api/classes?status=${status}`);
};

// Get single approved class 
export const getClassById = async (classId) => {
    return serverFetch(`/api/classes/${classId}`);
};