import { host } from ".";

const getSubdepartments = async () => {
    try {
        const response = await host.get("/subdepartments");

        return response;
    } catch (error) {
        if (error.response) {
            console.log("Error while loading subdepartments. Code: " + error.response.status);

            return error.response;
        } else if (error.request) {
            console.log("Server did not respond.");
        } else {
            console.log("Error while creating request");
        }
    }
};

export { getSubdepartments };
