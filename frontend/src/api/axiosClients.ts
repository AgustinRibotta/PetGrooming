import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://127.0.0.1:37275/api",
    headers: {
        "content-Type": "application/json",
    },
});

export default axiosClient;