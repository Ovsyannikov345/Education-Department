import { Container } from "@mui/joy";
import React, { useEffect, useState } from "react";
import { getEvent, getEvents, createEvent } from "../api/eventsApi.js";
import EventList from "../components/EventList.jsx";

function MainPage() {
    const [events, setEvents] = useState("");

    const loadEvents = async () => {
        const events = await getEvents();

        setEvents(events);
        console.log(events);
    };

    useEffect(() => {
        loadEvents();
    }, []);

    return (
        <Container>
            <EventList events={events} />
        </Container>
    );
}

export default MainPage;
