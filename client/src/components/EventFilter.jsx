import {
    Container,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getDepartments } from "../api/departmentsApi";
import { getDirections } from "../api/directionsApi";

const EventFilter = () => {
    const [departments, setDepartments] = useState([]);
    const [directions, setDirections] = useState([]);

    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [selectedDirection, setSelectedDirection] = useState(null);

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

    //TODO multiple select.
    const changeDepartment = (department) => {
        setSelectedDepartment(department);
    };

    const changeDirection = (direction) => {
        setSelectedDirection(direction);
    };

    return (
        <Grid container justifyContent={"center"} border={1}>
            <Grid container item xs={11}>
                <Paper elevation={3}>
                    <Grid container p={1} rowGap={1}>
                        <Typography>Поиск и фильтрация</Typography>
                        <TextField label={"Поиск по названию"} />
                        <FormControl fullWidth>
                            <InputLabel id="department-label">Отдел</InputLabel>
                            <Select
                                fullWidth
                                label-id="department-label"
                                label="Отдел"
                                value={selectedDepartment ?? ""}
                                onChange={(e) => changeDepartment(e.target.value)}
                            >
                                {departments.map((dep) => (
                                    <MenuItem key={dep.id} value={dep}>
                                        {dep.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {selectedDepartment != null && selectedDepartment.Subdepartments.length > 0 && (
                            <FormControl fullWidth>
                                <InputLabel id="department-label">Факультет</InputLabel>
                                <Select
                                    fullWidth
                                    label-id="department-label"
                                    label="Факультет"
                                    value={selectedDirection ?? ""}
                                    onChange={(e) => changeDirection(e.target.value)}
                                >
                                    {directions.map((dir) => (
                                        <MenuItem key={dir.id} value={dir}>
                                            {dir.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default EventFilter;
