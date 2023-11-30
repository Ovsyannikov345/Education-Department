import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import moment from "moment";
import DeleteConfirmationModal from "../modal/DeleteConfirmationModal/DeleteConfirmationModal";

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
                rowGap={1}
                marginTop={3}
                padding={2}
                borderRadius={2}
                sx={{ border: 1, borderColor: "#1976d29F" }}
            >
                <Grid item xs={12}>
                    <Typography variant="h5" overflow={"hidden"} whiteSpace={"nowrap"} textOverflow={"ellipsis"}>
                        {event.name}
                    </Typography>
                </Grid>
                <Grid item container xs={3} alignContent={"space-between"}>
                    <Grid item container xs={12}>
                        <Grid container item xs={12}>
                            <Grid container item xs={1.1} alignItems={"center"}>
                                <EventIcon />
                            </Grid>
                            <Grid item>
                                <Typography variant="h6">{moment(event.date).format("DD-MM-YYYY")}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} pb={3}>
                            <Grid container item xs={1.1} alignItems={"center"}>
                                <AccessTimeIcon />
                            </Grid>
                            <Grid item>
                                <Typography variant="h6">{moment.utc(event.date).format("HH:mm")}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} gap={2}>
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
                <Grid item container xs={9}>
                    <Grid item xs={5}>
                        <Typography variant="subtitle1" style={{ textDecoration: "underline" }}>
                            <b>Подразделение</b>
                        </Typography>
                        <Typography variant="h6">{event.Department.name}</Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <Typography variant="subtitle1" style={{ textDecoration: "underline" }}>
                            <b>Направление</b>
                        </Typography>
                        <Typography variant="h6">{event.Direction.name}</Typography>
                    </Grid>
                    <Grid item xs={5}>
                        {event.Subdepartment && (
                            <>
                                <Typography variant="subtitle1" style={{ textDecoration: "underline" }}>
                                    <b>Факультет</b>
                                </Typography>
                                <Typography variant="h6">
                                    {event.Subdepartment === null ? "" : event.Subdepartment.name}
                                </Typography>
                            </>
                        )}
                    </Grid>
                    <Grid item xs={7}>
                        {event.Subdirection && (
                            <>
                                <Typography variant="subtitle1" style={{ textDecoration: "underline" }}>
                                    <b>Тема</b>
                                </Typography>
                                <Typography variant="h6">
                                    {event.Subdirection === null ? "" : event.Subdirection.name}
                                </Typography>
                            </>
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default EventItem;
