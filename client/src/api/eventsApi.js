import { host } from ".";

const getEvents = async () => {
    const response = await host.get("/events");

    return response.data;
};

const getEvent = async (id) => {
    const response = await host.get(`/events/${id}`);

    return response.data;
};

const createEvent = async (event) => {
    const response = await host.post("/events");

    console.log(response.status);
};

export { getEvent, getEvents, createEvent };
