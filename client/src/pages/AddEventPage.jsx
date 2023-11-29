import React from "react";
import CreateEventForm from "../components/CreateEventForm";
import { postEvent } from "../api/eventsApi";

function AddEventPage() {
	const createEvent = async (event) => {
		await postEvent(event);
	}

	return (
		<CreateEventForm creationHandler={createEvent}/>
		// TODO margin bottom.
	);
}

export default AddEventPage;