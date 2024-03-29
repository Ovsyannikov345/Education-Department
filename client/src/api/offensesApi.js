import { host } from ".";
import updateToken from "../utils/updateToken";

const getOffenses = async () => {
    try {
        const response = await host.get("/offenses");

        return response;
    } catch (error) {
        if (error.response) {
            console.log("Error while loading offenses. Code: " + error.response.status);

            if (error.response.status === 401) {
                return await updateToken(getOffenses);
            }

            return error.response;
        } else if (error.request) {
            return { data: { error: "Сервис временно недоступен" } };
        } else {
            return { data: { error: "Ошибка при создании запроса" } };
        }
    }
};

const getOffense = async (id) => {
    try {
        const response = await host.get(`/offenses/${id}`);

        return response;
    } catch (error) {
        if (error.response) {
            console.log("Error while loading the offense. Code: " + error.response.status);

            if (error.response.status === 401) {
                return await updateToken(getOffense, id);
            }

            return error.response;
        } else if (error.request) {
            return { data: { error: "Сервис временно недоступен" } };
        } else {
            return { data: { error: "Ошибка при создании запроса" } };
        }
    }
};

const postOffense = async (offense) => {
    try {
        const response = await host.post("/offenses", offense);

        return response;
    } catch (error) {
        if (error.response) {
            console.log("Error while posting the offense. Code: " + error.response.status);

            if (error.response.status === 401) {
                return await updateToken(postOffense, offense);
            }

            return error.response;
        } else if (error.request) {
            return { data: { error: "Сервис временно недоступен" } };
        } else {
            return { data: { error: "Ошибка при создании запроса" } };
        }
    }
};

const putOffense = async (offense) => {
    try {
        const response = await host.put(`/offenses/${offense.id}`, offense);

        return response;
    } catch (error) {
        if (error.response) {
            console.log("Error while updating the offense. Code: " + error.response.status);

            if (error.response.status === 401) {
                return await updateToken(putOffense, offense);
            }

            return error.response;
        } else if (error.request) {
            return { data: { error: "Сервис временно недоступен" } };
        } else {
            return { data: { error: "Ошибка при создании запроса" } };
        }
    }
};

const deleteOffense = async (id) => {
    try {
        const response = await host.delete(`/offenses/${id}`);

        return response;
    } catch (error) {
        if (error.response) {
            console.log("Error while deleting offenses. Code: " + error.response.status);

            if (error.response.status === 401) {
                return await updateToken(deleteOffense, id);
            }

            return error.response;
        } else if (error.request) {
            return { data: { error: "Сервис временно недоступен" } };
        } else {
            return { data: { error: "Ошибка при создании запроса" } };
        }
    }
};

export { getOffenses, getOffense, postOffense, putOffense, deleteOffense };
