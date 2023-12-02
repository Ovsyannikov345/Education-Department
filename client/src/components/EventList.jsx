import React, { useEffect, useMemo, useState } from "react";
import EventItem from "./EventItem";
import { Container, Grid, Pagination, Stack, Typography } from "@mui/material";
import { ITEMS_PER_PAGE } from "../utils/consts";

const EventList = ({ events, deleteHandler }) => {
    const [page, setPage] = useState(1);
    const [pageEvents, setPageEvents] = useState([]);

    const pagesCount = useMemo(() => {
        var count = Math.floor(events.length / ITEMS_PER_PAGE);

        if (events.length % ITEMS_PER_PAGE !== 0) {
            count++;
        }

        return count;
    }, [events]);

    useEffect(() => {
        setPageEvents(events.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE));
    }, [events, page])

    const changePage = (event, value) => {
        setPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (events.length === 0) {
        return (
            <Typography variant="h4" mt={2}>
                Мероприятия не найдены
            </Typography>
        );
    }

    return (
        <Stack gap={1}>
            {pageEvents.map((event) => (
                <EventItem key={event.id} event={event} deleteHandler={deleteHandler} />
            ))}
            <Container>
                <Grid container justifyContent="center">
                    <Pagination
                        count={pagesCount}
                        color="primary"
                        shape="rounded"
                        page={page}
                        onChange={changePage}
                    ></Pagination>
                </Grid>
            </Container>
        </Stack>
    );
};

export default EventList;
