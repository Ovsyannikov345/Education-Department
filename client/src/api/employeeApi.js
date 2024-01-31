import { host } from ".";
import updateToken from "../utils/updateToken";

const getEmployees = async () => {
    try {
        const response = await host.get("/employees");

        return response;
    } catch (error) {
        if (error.response) {
            console.log("Error while loading employees. Code: " + error.response.status);

            if (error.response.status === 401) {
                return await updateToken(getEmployees);
            }

            return error.response;
        } else if (error.request) {
            return { data: { error: "Сервис временно недоступен" } };
        } else {
            return { data: { error: "Ошибка при создании запроса" } };
        }
    }
};

const postEmployee = async (employee) => {
    try {
        const response = await host.post("/employees", employee);

        return response;
    } catch (error) {
        if (error.response) {
            console.log("Error while posting the employee. Code: " + error.response.status);

            if (error.response.status === 401) {
                return await updateToken(postEmployee, employee);
            }

            return error.response;
        } else if (error.request) {
            return { data: { error: "Сервис временно недоступен" } };
        } else {
            return { data: { error: "Ошибка при создании запроса" } };
        }
    }
};

const deleteEmployee = async (id) => {
    try {
        const response = await host.delete(`/employees/${id}`);

        return response;
    } catch (error) {
        if (error.response) {
            console.log("Error while deleting the employee. Code: " + error.response.status);

            if (error.response.status === 401) {
                return await updateToken(deleteEmployee, id);
            }

            return error.response;
        } else if (error.request) {
            return { data: { error: "Сервис временно недоступен" } };
        } else {
            return { data: { error: "Ошибка при создании запроса" } };
        }
    }
};

export { getEmployees, postEmployee, deleteEmployee };
