import { getServerToken } from "./token";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const authHeaders = async (extra = {}) => {
    const token = await getServerToken();

    return {
        ...extra,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
};

export const serverMutation = async (path, data, method = "POST") => {
    const options = {
        method,
        headers: await authHeaders({
            "Content-Type": "application/json",
        }),
        cache: "no-store",
    };

    if (data !== undefined) {
        options.body = JSON.stringify(data);
    }

    const response = await fetch(`${BASE_URL}${path}`, options);

    return response.json();
};

export const serverFetch = async (path) => {
    const response = await fetch(`${BASE_URL}${path}`, {
        headers: await authHeaders(),
        cache: "no-store",
    });

    return response.json();
};