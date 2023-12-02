import { host } from ".";

const getOffenses = async () => {
    try {
        const response = await host.get("/offenses");
        return response;
    } catch (error) {
        if (error.response) {
            console.log("Error while loading offenses. Code: " + error.response.status);
            return error.response;
        } else if (error.request) {
            console.log("Server did not respond.");
        } else {
            console.log("Error while creating request");
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
            return error.response;
        } else if (error.request) {
            console.log("Server did not respond.");
        } else {
            console.log("Error while creating request");
        }
    }
};

export { getOffenses, deleteOffense };
