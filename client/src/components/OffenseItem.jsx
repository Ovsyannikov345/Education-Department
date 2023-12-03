import React, { useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import moment from "moment";
import DeleteConfirmationModal from "../modal/DeleteConfirmationModal/DeleteConfirmationModal";
import EvenIcon from "@mui/icons-material/Event";

const OffenseItem = ({ offense, deleteHandler }) => {
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const deleteOffense = () => {
        deleteHandler(offense.id);
    };

    return (
        <>
            <DeleteConfirmationModal
                isOpen={deleteModalOpen}
                acceptHandler={deleteOffense}
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
                <Grid container item xs={12}>
                    <Grid container item xs={12} gap={7}>
                        <Grid item>
                            <Typography
                                variant="h5"
                                overflow={"hidden"}
                                whiteSpace={"nowrap"}
                                textOverflow={"ellipsis"}
                            >
                                {`${offense.Student.lastName} ${offense.Student.firstName} ${offense.Student.patronymic}`}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6">{offense.Student.groupName}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} alignItems={"center"} gap={0.5}>
                        <EvenIcon />
                        <Typography variant="h6">
                            {moment.utc(offense.offenseDate).format("DD-MM-YYYY")}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="subtitle1" style={{ textDecoration: "underline" }}>
                            <b>Статья</b>
                        </Typography>
                        <Typography
                            variant="h6"
                            overflow={"hidden"}
                            whiteSpace={"nowrap"}
                            textOverflow={"ellipsis"}
                        >
                            {offense.article}
                        </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography variant="subtitle1" style={{ textDecoration: "underline" }}>
                            <b>Решение суда</b>
                        </Typography>
                        <Typography
                            variant="h6"
                            overflow={"hidden"}
                            whiteSpace={"nowrap"}
                            textOverflow={"ellipsis"}
                        >
                            {offense.courtDecision}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" style={{ textDecoration: "underline" }}>
                            <b>Взыскание</b>
                        </Typography>
                        <Typography variant="h6">{offense.penalty}</Typography>
                    </Grid>
                </Grid>
                <Grid container item xs={12} gap={2}>
                    <Grid item>
                        <Button variant="outlined" color="primary">
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

export default OffenseItem;
