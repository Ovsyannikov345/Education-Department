import React, { useState } from "react";
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
    MAINPAGE_ROUTE,
    ADDEVENT_ROUTE,
    OFFENSIVES_ROUTE,
    REPORTS_ROUTE,
    ADDOFFENSIVE_ROUTE,
} from "../utils/consts";
import DehazeIcon from "@mui/icons-material/Dehaze";
import EventIcon from "@mui/icons-material/Event";
import AddBoxIcon from "@mui/icons-material/AddBox";
import SummarizeIcon from "@mui/icons-material/Summarize";
import GavelIcon from "@mui/icons-material/Gavel";

function NavBar() {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        setDrawerOpen(open);
    };

    const navigate = useNavigate();

    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <Grid container alignItems={"center"} justifyContent={"space-between"}>
                        <Grid item container xs={6} alignItems={"center"} columnGap={2}>
                            <Grid item xs={0.5}>
                                <IconButton
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                    sx={{ mr: 2 }}
                                    onClick={toggleDrawer(true)}
                                >
                                    <DehazeIcon />
                                </IconButton>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant="h5">Отдел по воспитательной работе</Typography>
                            </Grid>
                            <Grid item xs={2} p={1}>
                                <img
                                    src="../images/BruLogo.png"
                                    alt="logo"
                                    style={{ maxWidth: "100px", height: "auto", borderRadius: "10px" }}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={1}>
                            <Button
                                color="inherit"
                                variant="outlined"
                                size="large"
                                sx={{ justifySelf: "flex-end" }}
                            >
                                Войти
                            </Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                <Box
                    sx={{ width: 260 }}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    <List>
                        <ListItem sx={{ cursor: "pointer" }} onClick={() => navigate(MAINPAGE_ROUTE)}>
                            <EventIcon />
                            <ListItemText primary="Мероприятия" style={{ marginLeft: 5 }} />
                        </ListItem>
                        <ListItem sx={{ cursor: "pointer" }} onClick={() => navigate(ADDEVENT_ROUTE)}>
                            <AddBoxIcon />
                            <ListItemText primary="Создать мероприятие" style={{ marginLeft: 5 }} />
                        </ListItem>
                        <ListItem sx={{ cursor: "pointer" }} onClick={() => navigate(OFFENSIVES_ROUTE)}>
                            <GavelIcon />
                            <ListItemText primary="Правонарушения" style={{ marginLeft: 5 }} />
                        </ListItem>
                        <ListItem sx={{ cursor: "pointer" }} onClick={() => navigate(ADDOFFENSIVE_ROUTE)}>
                            <AddBoxIcon />
                            <ListItemText primary="Создать правонарушение" style={{ marginLeft: 5 }} />
                        </ListItem>
                        <ListItem sx={{ cursor: "pointer" }} onClick={() => navigate(REPORTS_ROUTE)}>
                            <SummarizeIcon />
                            <ListItemText primary="Просмотреть отчеты" style={{ marginLeft: 5 }} />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </Box>
    );
}

export default NavBar;
