const BASE_URL = "http://localhost:5000";

export async function registerUser(user) {
    const response = await fetch(`${BASE_URL}/register`,
        {
            method: "POST",
            body: user,
        }
    );
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message);
    }
    return data;
}

export async function loginUser(user) {
    const response = await fetch(`${BASE_URL}/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        }
    );
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message);
    }
    return data;
}

export const changePassword = async ({ currentPassword, newPassword }) => {
    const token = localStorage.getItem("token");

    const response = await fetch(
        `${BASE_URL}/auth/change-password`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ currentPassword, newPassword })
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to change Password...");
    }

    return data;
}

export const forgotPassword = async (email) => {

    const response = await fetch(
        `${BASE_URL}/auth/forgot-password`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email })
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data;
}

export const resetPassword = async ({ email, verificationCode, newPassword }) => {

    const response = await fetch(
        `${BASE_URL}/auth/reset-password`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email, verificationCode, newPassword,
            }),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data;
}