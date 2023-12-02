import React, { useState } from "react";
import { Grid, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import RemoveIcon from "@mui/icons-material/PersonRemove";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import Zoom from "@mui/material/Zoom";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";

const EmployeeItem = ({ organizer, removeHandler, deleteHandler, readonly = false }) => {
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const deleteEmployee = () => {
        deleteHandler(organizer.id);
    };

    return (
        <>
            <DeleteConfirmationModal
                isOpen={deleteModalOpen}
                acceptHandler={deleteEmployee}
                declineHandler={() => setDeleteModalOpen(false)}
            />
            <Paper variant="outlined" style={{ borderWidth: 2, borderColor: "#1976d29F" }}>
                <Grid
                    container
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    style={{ paddingLeft: 10 }}
                >
                    <Grid item xs>
                        <Typography>{`${organizer.lastName} ${organizer.firstName} ${organizer.patronymic}`}</Typography>
                    </Grid>
                    <Grid item xs={2} container justifyContent={"flex-end"} minHeight={45}>
                        {!readonly && (
                            <>
                                <Tooltip title="Убрать" TransitionComponent={Zoom} followCursor>
                                    <IconButton onClick={(e) => removeHandler(organizer.id)}>
                                        <RemoveIcon color="primary" />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Удалить" TransitionComponent={Zoom} followCursor>
                                    <IconButton onClick={(e) => setDeleteModalOpen(true)}>
                                        <DeleteIcon color="error" />
                                    </IconButton>
                                </Tooltip>
                            </>
                        )}
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
};

export default EmployeeItem;
