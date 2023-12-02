import React from "react";
import EventItem from "./EventItem";
import { Stack, Typography } from "@mui/material";

const EventList = ({ events, deleteHandler }) => {
    if (events.length === 0) {
        return <Typography variant="h4" mt={2}>Мероприятия не найдены</Typography>;
    }

    return (
        <Stack gap={1}>
            {events.map((event) => (
                <EventItem key={event.id} event={event} deleteHandler={deleteHandler} />
            ))}
        </Stack>
    );
};

export default EventList;
