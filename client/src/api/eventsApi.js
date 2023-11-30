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

const putEvent = async (event) => {
    try {
        const response = await host.put(`/events/${event.id}`, event);
        return response.status;
    } catch (err) {
        return 404;
    }
};

const deleteEvent = async (id) => {
    const response = await host.delete(`/events/${id}`);

    return response;
};

export { getEvent, getEvents, postEvent, putEvent, deleteEvent };
