import axios from "axios";
axios.defaults.headers.common["Authorization"] = localStorage.getItem("accessToken");

const host = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

const authHost = axios.create({
    baseURL: process.env.REACT_APP_AUTH_URL,
});

export { host, authHost };
