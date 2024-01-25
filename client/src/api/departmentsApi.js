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
            console.log("Server did not respond.");
        } else {
            console.log("Error while creating request");
        }
    }
};

export { getDepartments };
