import { Grid, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { getEvents, deleteEvent } from "../api/eventsApi.js";
import EventList from "../components/EventList.jsx";
import EventSortSelector from "../components/EventSortSelector.jsx";
import EventFilter from "../components/EventFilter.jsx";

function MainPage() {
    const [events, setEvents] = useState([]);
    const [sortOption, setSortOption] = useState("date desc");

    const sortedEvents = useMemo(() => {
        switch (sortOption) {
            case "alphabetic":
                return [...events].sort((a, b) => a.name.localeCompare(b.name));
            case "date asc":
                return [...events].sort((a, b) => new Date(a.date.slice(0, -1)) - new Date(b.date.slice(0, -1)));
            case "date desc":
                return [...events].sort((a, b) => new Date(b.date.slice(0, -1)) - new Date(a.date.slice(0, -1)));
            default:
                return [...events];
        }
    }, [events, sortOption]);

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
        <Grid container alignItems={"flex-start"} mb={5}>
            <Grid container item xs={3}>
                <EventFilter />
            </Grid>
            <Grid container item xs={9} pl={2} pr={2}>
                <Grid container justifyContent={"space-between"} alignItems={"flex-end"} mt={2}>
                    <Grid item>
                        <Typography variant="h4">Список мероприятий</Typography>
                    </Grid>
                    <Grid item>
                        <EventSortSelector
                            options={[
                                { value: "alphabetic", name: "По алфавиту" },
                                { value: "date desc", name: "Сначала новые" },
                                { value: "date asc", name: "Сначала старые" },
                            ]}
                            value={sortOption}
                            changeHandler={setSortOption}
                        />
                    </Grid>
                </Grid>
                <EventList events={sortedEvents} deleteHandler={removeEvent} />
            </Grid>
        </Grid>
    );
}

export default MainPage;
