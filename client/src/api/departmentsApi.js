import { host } from ".";

const getDepartments = async () => {
    try {
        const response = await host.get("/departments");

        return response;
    } catch (error) {
        if (error.response) {
            console.log("Error while loading departments. Code: " + error.response.status);

            return error.response;
        } else if (error.request) {
            console.log("Server did not respond.");
        } else {
            console.log("Error while creating request");
        }
    }
};

export { getDepartments };
