import { host, authHost } from ".";
import updateToken from "./../utils/updateToken";

const getUsers = async () => {
    try {
        const response = await host.get("/users");

        return response;
    } catch (error) {
        if (error.response) {
            console.log("Error while loading users. Code: " + error.response.status);

            if (error.response.status === 401) {
                return await updateToken(getUsers);
            }

            return error.response;
        } else if (error.request) {
            return { data: { error: "Сервис временно недоступен" } };
        } else {
            return { data: { error: "Ошибка при создании запроса" } };
        }
    }
};

const postUser = async (userData) => {
    try {
        const response = await host.post("/users", userData);

        return response;
    } catch (error) {
        if (error.response) {
            if (error.response.status === 401) {
                return await updateToken(postUser, userData);
            }

            return error.response;
        } else if (error.request) {
            return { data: { error: "Сервис временно недоступен" } };
        } else {
            return { data: { error: "Ошибка при создании запроса" } };
        }
    }
};

const blockUser = async (id) => {
    try {
        const response = await host.post(`/users/${id}/block`);

        return response;
    } catch (error) {
        if (error.response) {
            console.log("Error while blocking the user. Code: " + error.response.status);

            if (error.response.status === 401) {
                return await updateToken(blockUser, id);
            }

            return error.response;
        } else if (error.request) {
            return { data: { error: "Сервис временно недоступен" } };
        } else {
            return { data: { error: "Ошибка при создании запроса" } };
        }
    }
};

const unblockUser = async (id) => {
    try {
        const response = await host.post(`/users/${id}/unblock`);

        return response;
    } catch (error) {
        if (error.response) {
            console.log("Error while unblocking the user. Code: " + error.response.status);

            if (error.response.status === 401) {
                return await updateToken(unblockUser, id);
            }

            return error.response;
        } else if (error.request) {
            return { data: { error: "Сервис временно недоступен" } };
        } else {
            return { data: { error: "Ошибка при создании запроса" } };
        }
    }
};

const changeUserPassword = async (userData) => {
    try {
        const response = await host.put(`/users/${localStorage.getItem("userId")}/password`, userData);

        return response;
    } catch (error) {
        if (error.response) {
            console.log("Error while changing password. Code: " + error.response.status);

            if (error.response.status === 401) {
                return await updateToken(changeUserPassword, userData);
            }

            return error.response;
        } else if (error.request) {
            return { data: { error: "Сервис временно недоступен" } };
        } else {
            return { data: { error: "Ошибка при создании запроса" } };
        }
    }
};

const sendNewPassword = async (email) => {
    try {
        const response = await authHost.post("/forgot-password", { email: email });

        return response;
    } catch (error) {
        if (error.response) {
            console.log("Error while sending new password. Code: " + error.response.status);

            return error.response;
        } else if (error.request) {
            return { data: { error: "Сервис временно недоступен" } };
        } else {
            return { data: { error: "Ошибка при создании запроса" } };
        }
    }
};

export { getUsers, postUser, blockUser, unblockUser, changeUserPassword, sendNewPassword };
