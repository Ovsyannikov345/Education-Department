import { host } from ".";

const getEvents = async () => {
    const response = await host.get("/events");

    return response.data;
};

const getEvent = async (id) => {
    const response = await host.get(`/events/${id}`);

    return response.data;
};

const postEvent = async (event) => {
    const response = await host.post("/events", event);

    return response.status;
};

const deleteEvent = async (id) => {
    const response = await host.delete(`/events/${id}`);

    return response;
}

export { getEvent, getEvents, postEvent, deleteEvent };
