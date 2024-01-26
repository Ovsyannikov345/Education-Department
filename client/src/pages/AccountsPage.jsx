import { Grid, Typography, Snackbar, Alert, Checkbox, FormControlLabel, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import SortSelector from "../components/SortSelector";
import { getUsers, blockUser, unblockUser } from "../api/userApi";
import UserCard from "../components/UserCard";

const AccountsPage = () => {
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const response = await getUsers();

            if (!response.status || response.status >= 300) {
                displayError(response.data.error);
                return;
            }

            setUsers(response.data);
        };

        loadData();
    }, []);

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

    const blockUserById = async (id) => {
        const response = await blockUser(id);

        if (response.status >= 300) {
            displayError(response.data.error);
            return;
        }

        const index = users.findIndex((user) => user.id === id);

        users[index].blockedAt = response.data.blockedAt;

        displaySuccess("Учетная запись заблокирована");
    };

    const unblockUserById = async (id) => {
        const response = await unblockUser(id);

        if (response.status >= 300) {
            displayError(response.data.error);
            return;
        }

        const index = users.findIndex((user) => user.id === id);

        users[index].blockedAt = null;

        displaySuccess("Учетная запись разблокирована");
    };

    // TODO implement user creation.

    return (
        <Grid container justifyContent={"center"} mb={5}>
            <Grid container item xs={8}>
                <Grid container justifyContent={"space-between"} alignItems={"flex-end"} mt={2}>
                    <Grid item>
                        <Typography variant="h4">Учетные записи</Typography>
                    </Grid>
                    <Grid item>
                        <SortSelector
                            options={[
                                { value: "alphabetic", name: "По алфавиту" },
                                { value: "date desc", name: "Сначала новые" },
                                { value: "date asc", name: "Сначала старые" },
                            ]}
                            value={
                                "alphabetic" //sortOption
                            }
                            //changeHandler={setSortOption}
                        />
                    </Grid>
                </Grid>
                <Grid container mt={1}>
                    <FormControlLabel control={<Checkbox />} label="Показывать заблокированные" />
                    {/* TODO implement */}
                </Grid>
                <Grid container item mt={1} xs={6}>
                    <TextField fullWidth placeholder="Поиск по имени или адресу эл.почты" />
                </Grid>
                <Grid item xs={12}>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <UserCard
                                key={user.id}
                                userData={user}
                                blockHandler={blockUserById}
                                unblockHandler={unblockUserById}
                                currentUserId={localStorage.getItem("userId")}
                            />
                        ))
                    ) : (
                        <Typography>Учетные записи не найдены</Typography>
                    )}
                </Grid>
            </Grid>
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
        </Grid>
    );
};

export default AccountsPage;
