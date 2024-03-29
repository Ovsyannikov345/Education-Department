import { host } from ".";
import updateToken from "../utils/updateToken";

const getGroups = async () => {
    try {
        const response = await host.get("/groups");

        return response;
    } catch (error) {
        if (error.response) {
            console.log("Error while loading groups. Code: " + error.response.status);

            if (error.response.status === 401) {
                return await updateToken(getGroups);
            }

            return error.response;
        } else if (error.request) {
            return { data: { error: "Сервис временно недоступен" } };
        } else {
            return { data: { error: "Ошибка при создании запроса" } };
        }
    }
};

const createGroup = async (group) => {
    try {
        const response = await host.post("/groups", group);

        return response;
    } catch (error) {
        if (error.response) {
            console.log("Error while creating the group. Code: " + error.response.status);

            if (error.response.status === 401) {
                return await updateToken(createGroup);
            }

            return error.response;
        } else if (error.request) {
            return { data: { error: "Сервис временно недоступен" } };
        } else {
            return { data: { error: "Ошибка при создании запроса" } };
        }
    }
};

const deleteGroup = async (id) => {
    try {
        const response = await host.delete(`/groups/${id}`);

        return response;
    } catch (error) {
        if (error.response) {
            console.log("Error while deleting the group. Code: " + error.response.status);

            if (error.response.status === 401) {
                return await updateToken(deleteGroup);
            }

            return error.response;
        } else if (error.request) {
            return { data: { error: "Сервис временно недоступен" } };
        } else {
            return { data: { error: "Ошибка при создании запроса" } };
        }
    }
};

export { getGroups, createGroup, deleteGroup };
