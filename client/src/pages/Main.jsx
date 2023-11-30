import { Container } from "@mui/joy";
import React, { useEffect, useState } from "react";
import { getEvents, deleteEvent } from "../api/eventsApi.js";
import EventList from "../components/EventList.jsx";

function MainPage() {
    const [events, setEvents] = useState([]);

    const loadEvents = async () => {
        const events = await getEvents();

        setEvents(events);
    };

    const removeEvent = async (id) => {
        const response = await deleteEvent(id);

        if (response.status === 200) {
            setEvents(events.filter((event) => event.id !== id));
        }
    };

    useEffect(() => {
        loadEvents();
    }, []);

    return (
        <Container>
            <EventList events={events} deleteHandler={removeEvent} />
        </Container>
    );
}

export default MainPage;
