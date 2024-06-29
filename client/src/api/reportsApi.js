import moment from "moment";
import { host } from ".";
import updateToken from "../utils/updateToken";

const getEventsReport = async (eventsQuery) => {
    try {
        const query = { ...eventsQuery };

        if (query.name === "") {
            query.name = null;
        }

        query.selectedDepartments = query.selectedDepartments.map((d) => d.id);
        query.selectedSubdepartments = query.selectedSubdepartments.map((s) => s.id);
        query.selectedDirections = query.selectedDirections.map((d) => d.id);
        query.selectedSubdirections = query.selectedSubdirections.map((s) => s.id);

        const response = await host.get("/reports/events", {
            responseType: "blob",
            params: query,
            timeout: 10000,
        });

        const filename = `${moment().format("DD-MM-YYYY_HH-mm")}.xlsx`;

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        return response;
    } catch (error) {
        if (error.response) {
            if (error.response.status === 401) {
                return await updateToken(getEventsReport);
            }

            return { data: { error: "Ошибка при создании отчета" } };
        } else if (error.request) {
            return { data: { error: "Сервис временно недоступен" } };
        } else {
            console.log(error);
            return { data: { error: "Ошибка при создании запроса" } };
        }
    }
};

const getOffensesReport = async (offensesQuery) => {
    try {
        const query = { ...offensesQuery };

        if (query.text === "") {
            query.text = null;
        }

        const response = await host.get("/reports/offenses", {
            responseType: "blob",
            params: query,
            timeout: 10000,
        });

        const filename = `${moment().format("DD-MM-YYYY_HH-mm")}.xlsx`;

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        return response;
    } catch (error) {
        if (error.response) {
            if (error.response.status === 401) {
                return await updateToken(getOffensesReport);
            }

            return { data: { error: "Ошибка при создании отчета" } };
        } else if (error.request) {
            return { data: { error: "Сервис временно недоступен" } };
        } else {
            console.log(error);
            return { data: { error: "Ошибка при создании запроса" } };
        }
    }
};

export { getEventsReport, getOffensesReport };
