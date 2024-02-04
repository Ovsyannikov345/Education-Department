import { host, authHost } from "../api";

const updateToken = async (requestFunction, argument) => {
    const refreshToken = localStorage.getItem("refreshToken");

    try {
        const response = await authHost.post("/refresh", { token: refreshToken });

        const accessToken = response.data.accessToken;

        localStorage.setItem("accessToken", accessToken);
        host.defaults.headers.common["Authorization"] = localStorage.getItem("accessToken");

        if (argument === undefined) {
            return await requestFunction();
        }

        return await requestFunction(argument);
    } catch (error) {
        localStorage.clear();
        window.location.reload();
    }
};

export default updateToken;
