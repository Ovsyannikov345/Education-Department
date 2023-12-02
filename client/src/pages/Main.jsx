import { Grid, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { getEvents, deleteEvent } from "../api/eventsApi.js";
import EventList from "../components/EventList.jsx";
import EventSortSelector from "../components/EventSortSelector.jsx";
import EventFilter from "../components/EventFilter.jsx";
import moment from "moment";

function MainPage() {
    const [events, setEvents] = useState([]);
    const [sortOption, setSortOption] = useState("date desc");
    const [searchQuery, setSearchQuery] = useState({
        name: "",
        departments: [],
        subdepartments: [],
        directions: [],
        subdirections: [],
        startDate: null,
        endDate: null,
    });

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

    const filteredEvents = useMemo(() => {
        const startDate = searchQuery.startDate != null ? moment(searchQuery.startDate) : null;
        const endDate = searchQuery.endDate != null ? moment(searchQuery.endDate) : null;

        const isGapValid = startDate == null || endDate == null ? true : endDate.isSameOrAfter(startDate);

        const filteredEvents = sortedEvents.filter(
            (event) =>
                event.name.includes(searchQuery.name) &&
                (searchQuery.departments.length > 0
                    ? searchQuery.departments.map((dep) => dep.id).includes(event.Department.id)
                    : true) &&
                (searchQuery.subdepartments.length > 0
                    ? event.Subdepartment == null ||
                      searchQuery.subdepartments.map((subdep) => subdep.id).includes(event.Subdepartment.id)
                    : true) &&
                (searchQuery.directions.length > 0
                    ? searchQuery.directions.map((dir) => dir.id).includes(event.Direction.id)
                    : true) &&
                (searchQuery.subdirections.length > 0
                    ? event.Subdirection == null ||
                      searchQuery.subdirections.map((subdir) => subdir.id).includes(event.Subdirection.id)
                    : true) &&
                (isGapValid && startDate != null
                    ? moment(event.date, "YYYY-MM-DD").isSameOrAfter(startDate)
                    : true) &&
                (isGapValid && endDate != null ? moment(event.date, "YYYY-MM-DD").isSameOrBefore(endDate) : true)
        );

        return filteredEvents;
    }, [sortedEvents, searchQuery]);

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
                <EventFilter queryHandler={setSearchQuery} />
            </Grid>
            <Grid container item xs={9} pl={2} pr={2}>
                <Grid container justifyContent={"space-between"} alignItems={"flex-end"} mt={2}>
                    <Grid item>
                        <Typography variant="h4">Список мероприятий {`(${filteredEvents.length})`}</Typography>
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
                <Grid item xs={12}>
                    <EventList events={filteredEvents} deleteHandler={removeEvent} />
                </Grid>
            </Grid>
        </Grid>
    );
}

export default MainPage;
