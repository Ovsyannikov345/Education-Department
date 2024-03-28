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

export { getGroups };
