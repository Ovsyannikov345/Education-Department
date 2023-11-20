import { host } from ".";

const getDepartments = async () => {
    const response = await host.get("/departments");

    return response.data;
};

export { getDepartments };
