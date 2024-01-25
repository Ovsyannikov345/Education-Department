import { host } from ".";
import updateToken from "../utils/updateToken";

const getDirections = async () => {
    try {
        const response = await host.get("/directions");

        return response;
    } catch (error) {
        if (error.response) {
            console.log("Error while loading directions. Code: " + error.response.status);

            if (error.response.status === 401) {
                return await updateToken(getDirections);
            }

            return error.response;
        } else if (error.request) {
            console.log("Server did not respond.");
        } else {
            console.log("Error while creating request");
        }
    }
};

export { getDirections };
