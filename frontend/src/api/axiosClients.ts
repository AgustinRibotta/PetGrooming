import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://192.168.49.2:32173/api",
    headers: {
        "content-Type": "application/json",
    },
});

export default axiosClient;