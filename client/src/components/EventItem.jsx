import { Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import moment from "moment";
import DeleteConfirmationModal from "../modal/DeleteConfirmationModal/DeleteConfirmationModal";
import { useNavigate } from "react-router-dom";

const EventItem = ({ event, deleteHandler }) => {
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const router = useNavigate();

    const deleteEvent = () => {
        deleteHandler(event.id);
    };

    return (
        <>
            <DeleteConfirmationModal
                isOpen={deleteModalOpen}
                acceptHandler={deleteEvent}
                declineHandler={() => setDeleteModalOpen(false)}
            />
            <Grid
                container
                rowGap={2}
                alignItems={"baseline"}
                marginTop={3}
                padding={2}
                borderRadius={2}
                sx={{ border: 1, borderColor: "#1976d29F" }}
            >
                <Grid item xs={4}>
                    <Typography variant="h4">{event.name}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="h5">{event.Department.name}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="subtitle1">{event.Direction.name}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="subtitle1">{moment(event.date).format("DD-MM-YYYY")}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="h5">
                        {event.Subdepartment === null ? "" : event.Subdepartment.name}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="subtitle1">
                        {event.Subdirection === null ? "" : event.Subdirection.name}
                    </Typography>
                </Grid>
                <Grid item xs={12} container columnGap={2}>
                    <Grid item>
                        <Button variant="outlined" onClick={() => router("/events/" + event.id)}>
                            Подробнее
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" color="error" onClick={() => setDeleteModalOpen(true)}>
                            Удалить
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default EventItem;
