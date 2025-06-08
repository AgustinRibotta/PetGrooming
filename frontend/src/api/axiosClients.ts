import axios from "axios";

const axiosClient = axios.create({
    baseURL: " http://127.0.0.1:34919/api",
    headers: {
        "content-Type": "application/json",
    },
});

export default axiosClient;