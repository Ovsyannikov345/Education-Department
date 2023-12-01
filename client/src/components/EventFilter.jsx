import React, { useEffect, useMemo, useState } from "react";
import {
    Button,
    Checkbox,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    ListItemText,
    Paper,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { getDepartments } from "../api/departmentsApi";
import { getDirections } from "../api/directionsApi";
import moment from "moment";

const EventFilter = () => {
    const [selectedDepartments, setSelectedDepartments] = useState([]);
    const [selectedSubdepartments, setSelectedSubdepartments] = useState([]);
    const [selectedDirections, setSelectedDirections] = useState([]);
    const [selectedSubdirections, setSelectedSubdirections] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [departments, setDepartments] = useState([]);
    const [directions, setDirections] = useState([]);

    const subdepartments = useMemo(() => {
        const subdepartments = [];

        selectedDepartments
            .filter((dep) => dep.Subdepartments.length > 0)
            .map((dep) => dep.Subdepartments)
            .forEach((subdepList) => subdepartments.push(...subdepList));
        return subdepartments;
    }, [selectedDepartments]);

    const subdirections = useMemo(() => {
        const subdirections = [];

        selectedDirections
            .filter((dir) => dir.Subdirections.length > 0)
            .map((dir) => dir.Subdirections)
            .forEach((subdirList) => subdirections.push(...subdirList));
        return subdirections;
    }, [selectedDirections]);

    useEffect(() => {
        const loadDepartments = async () => {
            const departments = await getDepartments();

            setDepartments(departments !== null ? departments : null);
        };

        const loadDirections = async () => {
            const directions = await getDirections();

            setDirections(directions !== null ? directions : []);
        };

        loadDepartments();
        loadDirections();
    }, []);

    const changeDepartments = (departments) => {
        setSelectedDepartments(departments);
    };

    const changeSubdepartments = (subdepartments) => {
        setSelectedSubdepartments(subdepartments);
    };

    const changeDirections = (directions) => {
        setSelectedDirections(directions);
    };

    const changeSubdirections = (subdirections) => {
        setSelectedSubdirections(subdirections);
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
                        <TextField label="Название" fullWidth autoComplete="off" />
                        <FormControl fullWidth>
                            <InputLabel id="department-label">Отделы</InputLabel>
                            <Select
                                fullWidth
                                labelId="department-label"
                                label="Отделы"
                                multiple
                                value={selectedDepartments}
                                onChange={(e) => changeDepartments(e.target.value)}
                                renderValue={(selected) => selected.map((dep) => dep.name).join(", ")}
                            >
                                {departments.map((dep) => (
                                    <MenuItem key={dep.id} value={dep}>
                                        <Checkbox checked={selectedDepartments.indexOf(dep) > -1} />
                                        <ListItemText primary={dep.name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {subdepartments.length > 0 && (
                            <FormControl fullWidth>
                                <InputLabel id="subdepartment-label">Факультеты</InputLabel>
                                <Select
                                    fullWidth
                                    labelId="subdepartment-label"
                                    label="Факультеты"
                                    multiple
                                    value={selectedSubdepartments}
                                    onChange={(e) => changeSubdepartments(e.target.value)}
                                    renderValue={(selected) =>
                                        selected.length > 2
                                            ? `Факультеты (${selected.length})`
                                            : selected.map((subdep) => subdep.name).join(", ")
                                    }
                                >
                                    {subdepartments.map((subdep) => (
                                        <MenuItem key={subdep.id} value={subdep}>
                                            <Checkbox checked={selectedSubdepartments.indexOf(subdep) > -1} />
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
                                value={selectedDirections}
                                onChange={(e) => changeDirections(e.target.value)}
                                renderValue={(selected) =>
                                    selected.length > 1 ? `Направления (${selected.length})` : selected[0].name
                                }
                            >
                                {directions.map((dir) => (
                                    <MenuItem key={dir.id} value={dir}>
                                        <Checkbox checked={selectedDirections.indexOf(dir) > -1} />
                                        <ListItemText primary={dir.name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {subdirections.length > 0 && (
                            <FormControl fullWidth>
                                <InputLabel id="subdirection-label">Темы</InputLabel>
                                <Select
                                    fullWidth
                                    labelId="subdirection-label"
                                    label="Темы"
                                    multiple
                                    value={selectedSubdirections}
                                    onChange={(e) => changeSubdirections(e.target.value)}
                                    renderValue={(selected) =>
                                        selected.length > 1
                                            ? `Темы (${selected.length})`
                                            : selected.map((subdir) => subdir.name).join(", ")
                                    }
                                >
                                    {subdirections.map((subdir) => (
                                        <MenuItem key={subdir.id} value={subdir}>
                                            <Checkbox checked={selectedSubdirections.indexOf(subdir) > -1} />
                                            <ListItemText primary={subdir.name} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                        <Grid container item xs={12} justifyContent={"space-between"}>
                            <Grid item xs={5}>
                                <DatePicker
                                    label="От"
                                    value={startDate != null ? moment(startDate) : null}
                                    maxDate={endDate != null ? moment(endDate) : null}
                                    onChange={(newDate) => setStartDate(moment(newDate).format("YYYY-MM-DD"))}
                                />
                            </Grid>
                            <Grid container item justifyContent={"center"} alignItems={"center"} xs={2}>
                                <div style={{ width: "30%", height: "2px", backgroundColor: "black" }}></div>
                            </Grid>
                            <Grid item xs={5}>
                                <DatePicker
                                    label="До"
                                    value={endDate != null ? moment(endDate) : null}
                                    minDate={startDate != null ? moment(startDate) : null}
                                    onChange={(newDate) => setEndDate(moment(newDate).format("YYYY-MM-DD"))}
                                />
                            </Grid>
                            {startDate != null && (
                                <Grid item xs={5}>
                                    <Button variant="text" onClick={() => setStartDate(null)}>
                                        Сброс
                                    </Button>
                                </Grid>
                            )}
                            {endDate != null && <Grid item xs={2} />}
                            {endDate != null && (
                                <Grid item xs={5}>
                                    <Button variant="text" onClick={() => setEndDate(null)}>
                                        Сброс
                                    </Button>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default EventFilter;
