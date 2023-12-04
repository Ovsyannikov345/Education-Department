import React from "react";
import CreateEventForm from "../components/CreateEventForm";
import { postEvent } from "../api/eventsApi";

function AddEventPage() {
    const createEvent = async (event) => {
        const response = await postEvent(event);

        if (response) {
            if (response.status < 300) {
                return true;
            } else {
                console.log("Error while creating the offense. Code: " + response.status);
            }
        } else {
            console.log("Server did not respond.");
        }

        return false;
    };

    return <CreateEventForm creationHandler={createEvent} />;
}

export default AddEventPage;
