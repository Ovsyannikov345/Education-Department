import { host } from ".";
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
        // TODO all api calls like this.
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
            console.log("Server did not respond.");
        } else {
            console.log("Error while creating request");
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
            console.log("Server did not respond.");
        } else {
            console.log("Error while creating request");
        }
    }
};

const changeUserPassword = async (userData) => {
    // TODO implement.
};

const sendNewPassword = async (email) => {
    // TODO implement.
};

export { getUsers, postUser, blockUser, unblockUser, changeUserPassword, sendNewPassword };
