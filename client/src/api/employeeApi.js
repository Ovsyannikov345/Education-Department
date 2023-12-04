import { host } from ".";

const getEmployees = async () => {
    try {
        const response = await host.get("/employees");

        return response;
    } catch (error) {
        if (error.response) {
            console.log("Error while loading employees. Code: " + error.response.status);

            return error.response;
        } else if (error.request) {
            console.log("Server did not respond.");
        } else {
            console.log("Error while creating request");
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

            return error.response;
        } else if (error.request) {
            console.log("Server did not respond.");
        } else {
            console.log("Error while creating request");
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

            return error.response;
        } else if (error.request) {
            console.log("Server did not respond.");
        } else {
            console.log("Error while creating request");
        }
    }
};

export { getEmployees, postEmployee, deleteEmployee };
