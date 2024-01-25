import { host } from ".";
import updateToken from "../utils/updateToken";

const getEvents = async () => {
    try {
        const response = await host.get("/events");

        return response;
    } catch (error) {
        if (error.response) {
            console.log("Error while loading events. Code: " + error.response.status);

            if (error.response.status === 401) {
                return await updateToken(getEvents);
            }

            return error.response;
        } else if (error.request) {
            console.log("Server did not respond.");
        } else {
            console.log("Error while creating request");
        }
    }
};

const getEvent = async (id) => {
    try {
        const response = await host.get(`/events/${id}`);

        return response;
    } catch (error) {
        if (error.response) {
            console.log("Error while loading the event. Code: " + error.response.status);

            if (error.response.status === 401) {
                return await updateToken(getEvent, id);
            }

            return error.response;
        } else if (error.request) {
            console.log("Server did not respond.");
        } else {
            console.log("Error while creating request");
        }
    }
};

const postEvent = async (event) => {
    try {
        const response = await host.post("/events", event);

        return response;
    } catch (error) {
        if (error.response) {
            console.log("Error while posting the event. Code: " + error.response.status);

            if (error.response.status === 401) {
                return await updateToken(postEvent, event);
            }

            return error.response;
        } else if (error.request) {
            console.log("Server did not respond.");
        } else {
            console.log("Error while creating request");
        }
    }
};

const putEvent = async (event) => {
    try {
        const response = await host.put(`/events/${event.id}`, event);

        return response;
    } catch (error) {
        if (error.response) {
            console.log("Error while updating the event. Code: " + error.response.status);

            if (error.response.status === 401) {
                return await updateToken(putEvent, event);
            }

            return error.response;
        } else if (error.request) {
            console.log("Server did not respond.");
        } else {
            console.log("Error while creating request");
        }
    }
};

const deleteEvent = async (id) => {
    try {
        const response = await host.delete(`/events/${id}`);

        return response;
    } catch (error) {
        if (error.response) {
            console.log("Error while deleting the event. Code: " + error.response.status);

            if (error.response.status === 401) {
                return await updateToken(deleteEvent, id);
            }

            return error.response;
        } else if (error.request) {
            console.log("Server did not respond.");
        } else {
            console.log("Error while creating request");
        }
    }
};

export { getEvent, getEvents, postEvent, putEvent, deleteEvent };
