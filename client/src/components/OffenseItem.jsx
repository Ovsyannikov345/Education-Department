import React, { useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import moment from "moment";
import DeleteConfirmationModal from "../modal/DeleteConfirmationModal/DeleteConfirmationModal";

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
                <Grid item xs={12}>
                    <Typography variant="h5" overflow={"hidden"} whiteSpace={"nowrap"} textOverflow={"ellipsis"}>
                        {`${offense.Student.lastName} ${offense.Student.firstName} ${offense.Student.patronymic}`}
                    </Typography>
                    <Typography variant="h6">{offense.Student.groupName}</Typography>
                    <Typography variant="h6">{moment.utc(offense.offenseDate).format("DD-MM-YYYY")}</Typography>
                    <Typography variant="h6">{offense.article}</Typography>
                    <Typography variant="h6">{offense.courtDecision}</Typography>
                    <Typography variant="h6">{offense.penalty}</Typography>
                    <Button variant="outlined" color="error" onClick={() => setDeleteModalOpen(true)}>
                        Удалить
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default OffenseItem;
