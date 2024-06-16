import React, { useEffect, useMemo, useState } from "react";
import { Button, Checkbox, FormControl, Grid, InputLabel, MenuItem, ListItemText, Paper, Select, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { getDepartments } from "../api/departmentsApi";
import { getDirections } from "../api/directionsApi";
import moment from "moment";
import { getSubdirections } from "../api/subdirectionsApi";

const EventFilter = ({ queryHandler, displaySuccess, displayError }) => {
    const [searchQuery, setSearchQuery] = useState(
        JSON.parse(localStorage.getItem("eventSearchQuery")) ?? {
            name: "",
            selectedDepartments: [],
            selectedSubdepartments: [],
            selectedDirections: [],
            selectedSubdirections: [],
            startDate: null,
            endDate: null,
        }
    );

    const [departments, setDepartments] = useState([]);
    const [directions, setDirections] = useState([]);
    const [subdirections, setSubdirections] = useState([]);

    const subdepartments = useMemo(() => {
        const subdepartments = [];

        if (!searchQuery.selectedDepartments) {
            return subdepartments;
        }

        searchQuery.selectedDepartments
            .filter((dep) => dep.Subdepartments.length > 0)
            .map((dep) => dep.Subdepartments)
            .forEach((subdepList) => subdepartments.push(...subdepList));

        return subdepartments.filter((subdep, pos, self) => self.map((subdep) => subdep.name).indexOf(subdep.name) === pos);
    }, [searchQuery.selectedDepartments]);

    useEffect(() => {
        const loadDepartments = async () => {
            const response = await getDepartments();

            if (!response.status || response.status >= 300) {
                displayError(response.data.error);
                return;
            }

            setDepartments(response.data);
        };

        const loadDirections = async () => {
            const response = await getDirections();

            if (!response.status || response.status >= 300) {
                displayError(response.data.error);
                return;
            }

            setDirections(response.data);
        };

        const loadSubdirections = async () => {
            const response = await getSubdirections();

            if (!response || response.status >= 300) {
                displayError(response.data.error);
                return;
            }

            setSubdirections(response.data);
        };

        loadDepartments().then(() => {
            loadDirections().then(() => {
                loadSubdirections();
            });
        });
    }, [displayError]);

    useEffect(() => {
        const query = {
            ...searchQuery,
            startDate: searchQuery.startDate !== "Invalid date" ? searchQuery.startDate : null,
            endDate: searchQuery.endDate !== "Invalid date" ? searchQuery.endDate : null,
        };

        localStorage.setItem("eventSearchQuery", JSON.stringify(query));

        queryHandler(searchQuery);
    }, [searchQuery, queryHandler]);

    const resetFilter = () => {
        setSearchQuery({
            name: "",
            selectedDepartments: [],
            selectedSubdepartments: [],
            selectedDirections: [],
            selectedSubdirections: [],
            startDate: null,
            endDate: null,
        });
        displaySuccess("Фильтр сброшен");
    };

    const changeDepartments = (departmentIds) => {
        setSearchQuery({
            ...searchQuery,
            selectedDepartments: departmentIds.map((id) => departments.find((dep) => dep.id === id)),
            selectedSubdepartments: searchQuery.selectedSubdepartments.filter((subdep) =>
                searchQuery.selectedDepartments.includes((dep) => dep.Subdepartments.map((s) => s.id).includes((id) => id === subdep.id))
            ),
        });
    };

    const changeSubdepartments = (subdepartments) => {
        setSearchQuery({
            ...searchQuery,
            selectedSubdepartments: subdepartments,
        });
    };

    const changeDirections = (directionIds) => {
        setSearchQuery({
            ...searchQuery,
            selectedDirections: directionIds.map((id) => directions.find((dir) => dir.id === id)),
        });
    };

    const changeSubdirections = (subdirectionIds) => {
        setSearchQuery({
            ...searchQuery,
            selectedSubdirections: subdirectionIds.map((id) => subdirections.find((subdir) => subdir.id === id)),
        });
    };

    return (
        <Grid container justifyContent={"flex-end"} mt={12}>
            <Grid container item xs={11.5}>
                <Paper
                    style={{
                        maxWidth: "100%",
                        boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.5)",
                        borderRadius: "8px",
                    }}
                    elevation={3}
                >
                    <Grid container p={1} pb={2} rowGap={1}>
                        <Grid item xs={12}>
                            <Typography variant="h5" textAlign={"center"}>
                                Поиск и фильтрация
                            </Typography>
                        </Grid>
                        <TextField
                            label="Название"
                            fullWidth
                            autoComplete="off"
                            value={searchQuery.name}
                            onChange={(e) => setSearchQuery({ ...searchQuery, name: e.target.value })}
                        />
                        <FormControl fullWidth>
                            <InputLabel id="department-label">Структуры</InputLabel>
                            <Select
                                fullWidth
                                labelId="department-label"
                                label="Структуры"
                                multiple
                                value={searchQuery.selectedDepartments.map((dep) => dep.id)}
                                onChange={(e) => changeDepartments(e.target.value)}
                                renderValue={(selected) =>
                                    departments.length > 0 ? selected.map((id) => departments.find((dep) => dep.id === id).name).join(", ") : ""
                                }
                            >
                                {departments.map((dep) => (
                                    <MenuItem key={dep.id} value={dep.id}>
                                        <Checkbox checked={searchQuery.selectedDepartments.some((selectedDep) => selectedDep.id === dep.id)} />
                                        <ListItemText primary={dep.name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {subdepartments.length > 0 && (
                            <FormControl fullWidth>
                                <InputLabel id="subdepartment-label">Подразделения</InputLabel>
                                <Select
                                    fullWidth
                                    labelId="subdepartment-label"
                                    label="Подразделения"
                                    multiple
                                    value={searchQuery.selectedSubdepartments}
                                    onChange={(e) => changeSubdepartments(e.target.value)}
                                    renderValue={(selected) =>
                                        selected.length > 2
                                            ? `Подразделения (${selected.length})`
                                            : selected.map((subdep) => subdep.name).join(", ")
                                    }
                                >
                                    {subdepartments.map((subdep) => (
                                        <MenuItem key={subdep.id} value={subdep}>
                                            <Checkbox checked={searchQuery.selectedSubdepartments.indexOf(subdep) > -1} />
                                            <ListItemText primary={subdep.name} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                        <FormControl fullWidth>
                            <InputLabel id="direction-label">Направления</InputLabel>
                            <Select
                                fullWidth
                                labelId="direction-label"
                                label="Направления"
                                multiple
                                value={searchQuery.selectedDirections.map((dir) => dir.id)}
                                onChange={(e) => changeDirections(e.target.value)}
                                renderValue={(selected) =>
                                    selected.length > 1
                                        ? `Направления (${selected.length})`
                                        : directions.length > 0
                                        ? directions.find((dir) => dir.id === selected[0]).name
                                        : ""
                                }
                            >
                                {directions.map((dir) => (
                                    <MenuItem key={dir.id} value={dir.id}>
                                        <Checkbox checked={searchQuery.selectedDirections.some((selectedDir) => selectedDir.id === dir.id)} />
                                        <ListItemText primary={dir.name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="subdirection-label">Составляющие</InputLabel>
                            <Select
                                fullWidth
                                labelId="subdirection-label"
                                label="Составляющие"
                                multiple
                                value={searchQuery.selectedSubdirections.map((subdir) => subdir.id)}
                                onChange={(e) => changeSubdirections(e.target.value)}
                                renderValue={(selected) =>
                                    selected.length > 1
                                        ? `Составляющие (${selected.length})`
                                        : subdirections.find((s) => s.id === selected[0])?.name
                                }
                            >
                                {subdirections.map((subdir) => (
                                    <MenuItem key={subdir.id} value={subdir.id}>
                                        <Checkbox
                                            checked={searchQuery.selectedSubdirections.some((selectedSubdir) => selectedSubdir.id === subdir.id)}
                                        />
                                        <ListItemText primary={subdir.name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Grid container item xs={12} justifyContent={"space-between"}>
                            <Grid item xs={5}>
                                <DatePicker
                                    label="От"
                                    value={searchQuery.startDate != null ? moment(searchQuery.startDate) : null}
                                    maxDate={searchQuery.endDate != null ? moment(searchQuery.endDate) : null}
                                    onChange={(newDate) =>
                                        setSearchQuery({
                                            ...searchQuery,
                                            startDate: moment(newDate).format("YYYY-MM-DD"),
                                        })
                                    }
                                />
                            </Grid>
                            <Grid container item justifyContent={"center"} alignItems={"center"} xs={2}>
                                <div style={{ width: "30%", height: "2px", backgroundColor: "black" }}></div>
                            </Grid>
                            <Grid item xs={5}>
                                <DatePicker
                                    label="До"
                                    value={searchQuery.endDate != null ? moment(searchQuery.endDate) : null}
                                    minDate={searchQuery.startDate != null ? moment(searchQuery.startDate) : null}
                                    onChange={(newDate) =>
                                        setSearchQuery({
                                            ...searchQuery,
                                            endDate: moment(newDate).format("YYYY-MM-DD"),
                                        })
                                    }
                                />
                            </Grid>
                            {searchQuery.startDate != null && (
                                <Grid item xs={5}>
                                    <Button variant="text" onClick={() => setSearchQuery({ ...searchQuery, startDate: null })}>
                                        Сброс
                                    </Button>
                                </Grid>
                            )}
                            {searchQuery.endDate != null && <Grid item xs={2} />}
                            {searchQuery.endDate != null && (
                                <Grid item xs={5}>
                                    <Button variant="text" onClick={() => setSearchQuery({ ...searchQuery, endDate: null })}>
                                        Сброс
                                    </Button>
                                </Grid>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <Button fullWidth variant="outlined" onClick={resetFilter}>
                                Сбросить все
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default EventFilter;
