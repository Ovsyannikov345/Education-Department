import { host } from ".";

const getDirections = async () => {
    const response = await host.get("/directions");

    return response.data;
};

export { getDirections };
