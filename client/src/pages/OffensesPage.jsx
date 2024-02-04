import React, { useEffect, useState, useMemo } from "react";
import { Typography, Grid, Snackbar, Alert } from "@mui/material";
import { getOffenses, deleteOffense } from "../api/offensesApi";
import OffenseList from "../components/OffenseList";
import SortSelector from "../components/SortSelector";
import compareStudents from "../utils/studentComparer";
import OffenseFilter from "../components/OffenseFilter";
import moment from "moment";

function OffensesPage() {
    const [offenses, setOffenses] = useState([]);
    const [sortOption, setSortOption] = useState("date desc");
    const [searchQuery, setSearchQuery] = useState({
        text: "",
        startDate: null,
        endDate: null,
    });

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

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

    const sortedOffenses = useMemo(() => {
        switch (sortOption) {
            case "name":
                return [...offenses].sort((a, b) => compareStudents(a, b));
            case "group":
                return [...offenses].sort((a, b) => a.Student.groupName.localeCompare(b.Student.groupName));
            case "date asc":
                return [...offenses].sort(
                    (a, b) => new Date(a.offenseDate.slice(0, -1)) - new Date(b.offenseDate.slice(0, -1))
                );
            case "date desc":
                return [...offenses].sort(
                    (a, b) => new Date(b.offenseDate.slice(0, -1)) - new Date(a.offenseDate.slice(0, -1))
                );
            default:
                return [...offenses];
        }
    }, [offenses, sortOption]);

    const filteredOffenses = useMemo(() => {
        const startDate = searchQuery.startDate != null ? moment(searchQuery.startDate) : null;
        const endDate = searchQuery.endDate != null ? moment(searchQuery.endDate) : null;
        const isGapValid = startDate == null || endDate == null ? true : endDate.isSameOrAfter(startDate);

        const filteredOffenses = sortedOffenses.filter(
            (offense) =>
                ([offense.Student.firstName, offense.Student.lastName, offense.Student.patronymic]
                    .join(" ")
                    .toLowerCase()
                    .includes(searchQuery.text.toLowerCase()) ||
                    offense.Student.groupName.toLowerCase().includes(searchQuery.text.toLowerCase())) &&
                (isGapValid && startDate != null
                    ? moment(offense.offenseDate, "YYYY-MM-DD").isSameOrAfter(startDate)
                    : true) &&
                (isGapValid && endDate != null
                    ? moment(offense.offenseDate, "YYYY-MM-DD").isSameOrBefore(endDate)
                    : true)
        );

        return filteredOffenses;
    }, [sortedOffenses, searchQuery]);

    useEffect(() => {
        const loadOffenses = async () => {
            const response = await getOffenses();

            if (!response.status || response.status >= 300) {
                displayError(response.data.error);
                return;
            }

            setOffenses(response.data);
        };

        loadOffenses();
    }, []);

    const removeOffense = async (id) => {
        const response = await deleteOffense(id);

        if (!response.status || response.status >= 300) {
            displayError(response.data.error);
            return;
        }

        setOffenses(offenses.filter((off) => off.id !== id));
        displaySuccess("Правонарушение удалено");
    };

    return (
        <>
            <Grid container alignItems={"flex-start"} mb={5}>
                <Grid container item xs={3}>
                    <OffenseFilter queryHandler={setSearchQuery} />
                </Grid>
                <Grid container item xs={9} pl={2} pr={2}>
                    <Grid container justifyContent={"space-between"} alignItems={"flex-end"} mt={2}>
                        <Grid item>
                            <Typography variant="h4">
                                Список правонарушений {`(${filteredOffenses.length})`}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <SortSelector
                                options={[
                                    { value: "name", name: "По имени" },
                                    { value: "group", name: "По группе" },
                                    { value: "date desc", name: "Сначала новые" },
                                    { value: "date asc", name: "Сначала старые" },
                                ]}
                                value={sortOption}
                                changeHandler={setSortOption}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <OffenseList offenses={filteredOffenses} deleteHandler={removeOffense} />
                    </Grid>
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
        </>
    );
}

export default OffensesPage;
