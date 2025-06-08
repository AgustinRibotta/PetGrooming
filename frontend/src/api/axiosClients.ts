import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://192.168.49.2:30415/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosClient;