import { Grid, Typography, Snackbar, Alert, Checkbox, FormControlLabel, TextField, Button } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import SortSelector from "../components/SortSelector";
import { getUsers, blockUser, unblockUser } from "../api/userApi";
import UserCard from "../components/UserCard";
import CreateUserModal from "../modal/CreateUserModal/CreateUserModal";

const AccountsPage = () => {
    const [createModalOpen, setCreateModalOpen] = useState(false);

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const [users, setUsers] = useState([]);

    const [sortOption, setSortOption] = useState("date desc");

    const [searchQuery, setSearchQuery] = useState({
        showBlocked: false,
        text: "",
    });

    const sortedUsers = useMemo(() => {
        switch (sortOption) {
            case "date asc":
                return [...users].sort(
                    (a, b) => new Date(a.createdAt.slice(0, -1)) - new Date(b.createdAt.slice(0, -1))
                );
            case "date desc":
                return [...users].sort(
                    (a, b) => new Date(b.createdAt.slice(0, -1)) - new Date(a.createdAt.slice(0, -1))
                );
            case "alphabetic":
                return [...users].sort((a, b) =>
                    [a.lastName, a.firstName, a.patronymic]
                        .join("")
                        .localeCompare([b.lastName, b.firstName, b.patronymic].join(""))
                );
            default:
                return [...users];
        }
    }, [users, sortOption]);

    const sortedAndFilteredUsers = useMemo(() => {
        return sortedUsers.filter(
            (user) =>
                (searchQuery.showBlocked || user.blockedAt == null) &&
                ([user.lastName, user.firstName, user.patronymic].join(" ").includes(searchQuery.text) ||
                    user.email.includes(searchQuery.text))
        );
    }, [sortedUsers, searchQuery]);

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

        const updatedUsers = [...users];

        updatedUsers[index] = { ...updatedUsers[index], blockedAt: response.data.blockedAt };
        setUsers(updatedUsers);
        displaySuccess("Учетная запись заблокирована");
    };

    const unblockUserById = async (id) => {
        const response = await unblockUser(id);

        if (response.status >= 300) {
            displayError(response.data.error);
            return;
        }

        const index = users.findIndex((user) => user.id === id);

        const updatedUsers = [...users];

        updatedUsers[index] = { ...updatedUsers[index], blockedAt: null };
        setUsers(updatedUsers);
        displaySuccess("Учетная запись разблокирована");
    };

    const addUser = (user) => {
        setUsers([...users, user]);
        displaySuccess("Учетная запись создана");
    };

    return (
        <>
            <CreateUserModal
                open={createModalOpen}
                closeHandler={() => setCreateModalOpen(false)}
                errorCallback={displayError}
                successCallback={addUser}
            />
            <Grid container justifyContent={"center"} mb={5}>
                <Grid container item xs={8}>
                    <Grid container justifyContent={"space-between"} alignItems={"flex-end"} mt={2}>
                        <Grid item container xs={8} gap={3}>
                            <Typography variant="h4">Учетные записи</Typography>
                            <Button variant="contained" onClick={() => setCreateModalOpen(true)}>
                                Создать
                            </Button>
                        </Grid>
                        <Grid item>
                            <SortSelector
                                options={[
                                    { value: "date desc", name: "Сначала новые" },
                                    { value: "date asc", name: "Сначала старые" },
                                    { value: "alphabetic", name: "По алфавиту" },
                                ]}
                                value={sortOption}
                                changeHandler={setSortOption}
                            />
                        </Grid>
                    </Grid>
                    <Grid container mt={1}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={searchQuery.showBlocked}
                                    onChange={(e) =>
                                        setSearchQuery({ ...searchQuery, showBlocked: e.target.checked })
                                    }
                                />
                            }
                            label="Показывать заблокированные"
                        />
                    </Grid>
                    <Grid container item mt={1} xs={6}>
                        <TextField
                            fullWidth
                            placeholder="Поиск по имени или адресу эл.почты"
                            value={searchQuery.text}
                            onChange={(e) => setSearchQuery({ ...searchQuery, text: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        {sortedAndFilteredUsers.length > 0 ? (
                            sortedAndFilteredUsers.map((user) => (
                                <UserCard
                                    key={user.id}
                                    userData={user}
                                    blockHandler={blockUserById}
                                    unblockHandler={unblockUserById}
                                    currentUserId={localStorage.getItem("userId")}
                                />
                            ))
                        ) : (
                            <Typography variant="h5" mt={2}>
                                Учетные записи не найдены
                            </Typography>
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
        </>
    );
};

export default AccountsPage;
