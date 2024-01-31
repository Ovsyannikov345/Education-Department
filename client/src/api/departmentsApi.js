import { host } from ".";
import updateToken from "../utils/updateToken";

const getDepartments = async () => {
    try {
        const response = await host.get("/departments");

        return response;
    } catch (error) {
        if (error.response) {
            console.log("Error while loading departments. Code: " + error.response.status);

            if (error.response.status === 401) {
                return await updateToken(getDepartments);
            }

            return error.response;
        } else if (error.request) {
            return { data: { error: "Сервис временно недоступен" } };
        } else {
            return { data: { error: "Ошибка при создании запроса" } };
        }
    }
};

export { getDepartments };
