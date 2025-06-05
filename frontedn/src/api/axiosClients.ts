import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "content-Type": "application/json",
    },
});

export default axiosClient;