import React from "react";
import { Grid, IconButton, Paper, Typography } from "@mui/material";
import RemoveIcon from "@mui/icons-material/PersonRemove";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

const OrganizerItem = ({ organizer, removeHandler, deleteHandler }) => {
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
                    <Typography>{`${organizer.lastName} ${organizer.firstName} ${organizer.patronymic}`}</Typography>
                </Grid>
                <Grid item xs={2}>
                    <IconButton onClick={(e) => removeHandler(organizer.id)}>
                        <RemoveIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={(e) => deleteHandler(organizer.id)}>
                        <DeleteIcon color="error" />
                    </IconButton>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default OrganizerItem;
