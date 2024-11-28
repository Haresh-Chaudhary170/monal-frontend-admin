import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export const loginAdmin = async (credentials: { email: string; password: string }) => {
    try {
        const response = await axios.post(`${API_URL}/api/loginAdmin`, credentials, {
            withCredentials: true,
        });
        return response.data;
    } catch (err: any) {
        throw err.response?.data || { message: "Server error" };
    }
};


export const logout = async () => {
    try {
        await axios.post(`${API_URL}/api/logoutAdmin`, {}, { withCredentials: true });
        return true;
    } catch (error) {
        console.error("Logout failed:", error);
        return false;
    }
};