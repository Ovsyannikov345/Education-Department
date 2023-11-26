import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import moment from "moment";

const EventItem = ({ event }) => {
    // TODO Delete button.
    return (
        <Grid
            container
            rowGap={2}
            alignItems={"baseline"}
            marginTop={3}
            padding={2}
            borderRadius={2}
            sx={{border: 1 , borderColor: "#1976d29F"}}
        >
            <Grid item xs={4}>
                <Typography variant="h4">{event.name}</Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography variant="h5">{event.Department.name}</Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography variant="subtitle1">
                    {event.Direction.name}
                </Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography variant="subtitle1">
                    {moment(event.date).format("DD-MM-YYYY")}
                </Typography>
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
            <Grid item xs={4}>
                <Button variant="outlined">Подробнее</Button>
            </Grid>
        </Grid>
    );
};

export default EventItem;
