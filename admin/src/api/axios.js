import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL || "https://voters-app-backend.vercel.app/api";

const instance = axios.create({
    baseURL: baseUrl,
});

export default instance;
