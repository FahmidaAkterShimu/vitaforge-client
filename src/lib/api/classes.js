"use server";

// Triner classes
export const getTrainerClasses = async (trainerId, status="Pending") => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/classes?trainerId=${trainerId}&status=${status}`);

    return response.json();
}

// Enrolled students
export const getClassStudents = async (classId) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/classes/${classId}/students`
    );

    return response.json();
};