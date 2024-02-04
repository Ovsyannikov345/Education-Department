import { Grid, Typography, Snackbar, Alert } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { getEvents, deleteEvent } from "../api/eventsApi.js";
import EventList from "../components/EventList.jsx";
import SortSelector from "../components/SortSelector.jsx";
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

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const displayError = (message) => {
        setErrorMessage(message);
        setError(true);
    };

    const displaySuccess = (message) => {
        setSuccessMessage(message);
        setSuccess(true);
    };

    const closeSnackbar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setSuccess(false);
        setError(false);
    };

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
                event.name.toLowerCase().includes(searchQuery.name.toLowerCase()) &&
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

    useEffect(() => {
        const loadEvents = async () => {
            const response = await getEvents();

            if (!response.status || response.status >= 300) {
                displayError(response.data.error);
                return;
            }

            setEvents(response.data);
        };

        loadEvents();
    }, []);

    const removeEvent = async (id) => {
        const response = await deleteEvent(id);

        if (!response.status || response.status >= 300) {
            displayError(response.data.error);
            return;
        }

        setEvents(events.filter((event) => event.id !== id));
        displaySuccess("Мероприятие удалено");
    };

    return (
        <>
            <Grid container alignItems={"flex-start"} mb={5}>
                <Grid container item xs={3}>
                    <EventFilter
                        queryHandler={setSearchQuery}
                        displaySuccess={displaySuccess}
                        displayError={displayError}
                    />
                </Grid>
                <Grid container item xs={9} pl={2} pr={2}>
                    <Grid container justifyContent={"space-between"} alignItems={"flex-end"} mt={2}>
                        <Grid item>
                            <Typography variant="h4">
                                Список мероприятий {`(${filteredEvents.length})`}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <SortSelector
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
            <Snackbar open={error} autoHideDuration={6000} onClose={closeSnackbar}>
                <Alert onClose={closeSnackbar} severity="error" sx={{ width: "100%" }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
            <Snackbar open={success} autoHideDuration={6000} onClose={closeSnackbar}>
                <Alert onClose={closeSnackbar} severity="success" sx={{ width: "100%" }}>
                    {successMessage}
                </Alert>
            </Snackbar>
        </>
    );
}

export default MainPage;
