import React from "react";
import CreateEventForm from "../components/CreateEventForm";
import { postEvent } from "../api/eventsApi";

function AddEventPage() {
    const createEvent = async (event) => {
        const response = await postEvent(event);

        if (!response.status || response.status >= 300) {
            return response.data.error;
        }

        return "";
    };

    return <CreateEventForm creationHandler={createEvent} />;
}

export default AddEventPage;
