import React from "react";
import { Grid, IconButton, Paper, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

const OrganizerItem = ({ organizer, removeHandler }) => {
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
                        <DeleteIcon color="error" />
                    </IconButton>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default OrganizerItem;
