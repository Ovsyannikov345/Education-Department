import { host } from ".";

const getSubdepartments = async () => {
    const response = await host.get("/subdepartments");

    return response.data;
};

export { getSubdepartments };
