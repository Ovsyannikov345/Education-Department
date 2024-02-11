import React, { useState } from "react";
import { Grid, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import RemoveIcon from "@mui/icons-material/PersonRemove";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import Zoom from "@mui/material/Zoom";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";

const StudentItem = ({ student, removeHandler, deleteHandler, readonly = false }) => {
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const deleteStudent = () => {
        deleteHandler(student.id);
    };

    return (
        <>
            <DeleteConfirmationModal
                isOpen={deleteModalOpen}
                acceptHandler={deleteStudent}
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
                        <Typography>{`${student.groupName}`}</Typography>
                        <Typography>{`${student.lastName} ${student.firstName} ${student.patronymic}`}</Typography>
                    </Grid>
                    <Grid item xs={2} container justifyContent={"flex-end"} minHeight={45}>
                        {!readonly && (
                            <>
                                <Tooltip title="Убрать" TransitionComponent={Zoom} followCursor>
                                    <IconButton onClick={(e) => removeHandler(student.id)}>
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

export default StudentItem;
