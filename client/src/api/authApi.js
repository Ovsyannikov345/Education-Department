import { authHost } from ".";

const login = async ({ email, password }) => {
    try {
        const response = await authHost.post("/login", { email: email, password: password });

        return response;
    } catch (error) {
        if (error.response) {
            return error.response;
        } else if (error.request) {
            console.log("Server did not respond.");
        } else {
            console.log("Error while creating request");
        }
    }
};

export { login };
