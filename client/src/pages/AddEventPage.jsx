import React, { useState } from "react";
import CreateEventForm from "../components/CreateEventForm";
import { postEvent } from "../api/eventsApi";

function AddEventPage() {
	const createEvent = async (event) => {
		const response = await postEvent(event);
		console.log("event send");
		console.log(response);
	}

	return (
		<CreateEventForm creationHandler={createEvent}/>
	);
}

export default AddEventPage;