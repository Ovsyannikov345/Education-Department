import React from "react";
import { Grid, IconButton, Paper, Typography } from "@mui/material";
import RemoveIcon from "@mui/icons-material/PersonRemove";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

const OrganizerItem = ({ organizer, removeHandler, deleteHandler }) => {
    return (
        <Paper variant="outlined">
            <Grid container alignItems={"center"} style={{ paddingLeft: 10 }}>
                <Grid item xs={3}>
                    <Typography>{organizer.lastName}</Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography>{organizer.firstName}</Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography>{organizer.patronymic}</Typography>
                </Grid>
                <Grid item xs={3}>
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
