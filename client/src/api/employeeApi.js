import { host } from ".";

const getEmployees = async () => {
    const response = await host.get("/employees");

    return response.data;
};

const postEmployee = async (employee) => {
    const response = await host.post("/employees", employee);

    return response;
};

const deleteEmployee = async (id) => {
    const response = await host.delete(`/employees/${id}`);

    return response;
};

export { getEmployees, postEmployee, deleteEmployee };
