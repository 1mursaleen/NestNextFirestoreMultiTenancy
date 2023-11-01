import axios from "axios";

const apiClient = axios.create({
    // baseURL: process.env.NEXT_PUBLIC_BASE_API_URL, // Replace with your API base URL
    baseURL: "/api",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // Authorization: "Bearer YOUR_ACCESS_TOKEN", // Replace with your access token or authentication header
    },
});

export default apiClient;
