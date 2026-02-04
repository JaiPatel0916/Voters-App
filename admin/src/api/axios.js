import axios from "axios";

const instance = axios.create({
    baseURL: "https://voters-app-backend.vercel.app/api",
});

export default instance;
