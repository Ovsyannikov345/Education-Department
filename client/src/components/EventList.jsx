import React from "react";
import EventItem from "./EventItem";
import { Stack, Typography } from "@mui/material";

const EventList = ({ events }) => {
    if (events.length === 0) {
        return <Typography variant="h3">Нет событий</Typography>;
    }

    return (
        <Stack gap={1}>
            {events.map((event) => (
                <EventItem key={event.id} event={event} />
            ))}
        </Stack>
    );
};

export default EventList;
