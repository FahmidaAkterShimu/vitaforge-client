export const serverMutation = async (path, data) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}${path}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );

    // handle 401, 403, 404

    return response.json();
};