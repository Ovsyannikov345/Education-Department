import React, { useState } from "react";
import { Grid, IconButton, Paper, Typography } from "@mui/material";
import RemoveIcon from "@mui/icons-material/PersonRemove";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";

const ParticipantItem = ({
    participant,
    removeHandler,
    deleteHandler,
    readonly = false,
}) => {
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const deleteParticipant = () => {
        deleteHandler(participant.id);
    };

    return (
        <>
            <DeleteConfirmationModal
                isOpen={deleteModalOpen}
                acceptHandler={deleteParticipant}
                declineHandler={() => setDeleteModalOpen(false)}
            />
            <Paper
                variant="outlined"
                style={{ borderWidth: 2, borderColor: "#1976d29F" }}
            >
                <Grid
                    container
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    style={{ paddingLeft: 10 }}
                >
                    <Grid item xs>
                        <Typography>{`${participant.lastName} ${participant.firstName} ${participant.patronymic} ${participant.organization} ${participant.position}`}</Typography>
                    </Grid>
                    <Grid
                        item
                        xs={2}
                        container
                        justifyContent={"flex-end"}
                        minHeight={45}
                    >
                        {!readonly && (
                            <>
                                <IconButton
                                    onClick={(e) =>
                                        removeHandler(participant.id)
                                    }
                                >
                                    <RemoveIcon color="primary" />
                                </IconButton>
                                <IconButton
                                    onClick={(e) => setDeleteModalOpen(true)}
                                >
                                    <DeleteIcon color="error" />
                                </IconButton>
                            </>
                        )}
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
};

export default ParticipantItem;
