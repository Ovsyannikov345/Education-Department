import React from "react";
import { Grid, IconButton, Paper, Typography } from "@mui/material";
import RemoveIcon from "@mui/icons-material/PersonRemove";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

const ParticipantItem = ({ participant, removeHandler, deleteHandler }) => {
    return (
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
                <Grid item xs={2}>
                    <IconButton onClick={(e) => removeHandler(participant.id)}>
                        <RemoveIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={(e) => deleteHandler(participant.id)}>
                        <DeleteIcon color="error" />
                    </IconButton>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default ParticipantItem;
