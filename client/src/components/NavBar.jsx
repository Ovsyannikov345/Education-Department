import React, { useState, useEffect } from "react";
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Grid,
    Snackbar,
    Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
    MAINPAGE_ROUTE,
    ADDEVENT_ROUTE,
    OFFENSIVES_ROUTE,
    REPORTS_ROUTE,
    ADDOFFENSIVE_ROUTE,
    ACCOUNTS_ROUTE,
} from "../utils/consts";
import DehazeIcon from "@mui/icons-material/Dehaze";
import EventIcon from "@mui/icons-material/Event";
import AddBoxIcon from "@mui/icons-material/AddBox";
import SummarizeIcon from "@mui/icons-material/Summarize";
import GavelIcon from "@mui/icons-material/Gavel";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";
import LockIcon from "@mui/icons-material/Lock";
import ChangePasswordModal from "../modal/ChangePasswordModal/ChangePasswordModal";
import { logout } from "../api/authApi";

function NavBar() {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));

    const [drawerOpen, setDrawerOpen] = useState(false);

    const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false);

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const iframe = document.createElement("iframe");
        iframe.style.display = "none";

        document.body.appendChild(iframe);
        iframe.contentWindow.addEventListener("storage", () => {
            setAccessToken(localStorage.getItem("accessToken"));
        });

        return () => {
            iframe.contentWindow.removeEventListener("storage", () => {
                setAccessToken(localStorage.getItem("accessToken"));
            });
            document.body.removeChild(iframe);
        };
    }, []);

    const toggleDrawer = (open) => (event) => {
        setDrawerOpen(open);
    };

    const displayError = (message) => {
        setErrorMessage(message);
        setError(true);
    };

    const displaySuccess = (message) => {
        setSuccessMessage(message);
        setSuccess(true);
    };

    const closeSnackbar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setSuccess(false);
        setError(false);
    };

    return (
        <>
            <ChangePasswordModal
                open={changePasswordModalOpen}
                closeHandler={() => setChangePasswordModalOpen(false)}
                successCallback={displaySuccess}
                errorCallback={displayError}
            />
            <Box>
                <AppBar position="static">
                    <Toolbar>
                        <Grid container alignItems={"center"} justifyContent={"space-between"}>
                            <Grid item container xs={6} alignItems={"center"} columnGap={2}>
                                <Grid item xs={0.5}>
                                    {accessToken && (
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
                                    )}
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
                            <Grid container item xs={1} justifyContent={"flex-end"}>
                                {accessToken && (
                                    <IconButton size="large" color="inherit" onClick={async () => {
                                        await logout();
                                        localStorage.clear()
                                        window.location.reload();
                                    }}>
                                        <LogoutIcon fontSize="large" />
                                    </IconButton>
                                )}
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                    <Box
                        sx={{ width: 260, height: "100%" }}
                        role="presentation"
                        onKeyDown={toggleDrawer(false)}
                        display={"flex"}
                        flexDirection={"column"}
                        justifyContent={"space-between"}
                    >
                        <List onClick={toggleDrawer(false)}>
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
                            {localStorage.getItem("role") === "admin" && (
                                <ListItem sx={{ cursor: "pointer" }} onClick={() => navigate(ACCOUNTS_ROUTE)}>
                                    <AccountBoxIcon />
                                    <ListItemText primary="Учетные записи" style={{ marginLeft: 5 }} />
                                </ListItem>
                            )}
                        </List>
                        <List onClick={toggleDrawer(false)}>
                            <ListItem sx={{ cursor: "pointer" }} onClick={() => setChangePasswordModalOpen(true)}>
                                <LockIcon />
                                <ListItemText primary="Сменить пароль" style={{ marginLeft: 5 }} />
                            </ListItem>
                        </List>
                    </Box>
                </Drawer>
            </Box>
            <Snackbar open={error} autoHideDuration={6000} onClose={closeSnackbar}>
                <Alert onClose={closeSnackbar} severity="error" sx={{ width: "100%" }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
            <Snackbar open={success} autoHideDuration={6000} onClose={closeSnackbar}>
                <Alert onClose={closeSnackbar} severity="success" sx={{ width: "100%" }}>
                    {successMessage}
                </Alert>
            </Snackbar>
        </>
    );
}

export default NavBar;
