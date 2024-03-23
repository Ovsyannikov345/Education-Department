import { host } from ".";
import updateToken from "../utils/updateToken";

const getSubdirections = async () => {
    try {
        const response = await host.get("/subdirections");

        return response;
    } catch (error) {
        if (error.response) {
            console.log("Error while loading subdirections. Code: " + error.response.status);

            if (error.response.status === 401) {
                return await updateToken(getSubdirections);
            }

            return error.response;
        } else if (error.request) {
            return { data: { error: "Сервис временно недоступен" } };
        } else {
            return { data: { error: "Ошибка при создании запроса" } };
        }
    }
};

export { getSubdirections };
