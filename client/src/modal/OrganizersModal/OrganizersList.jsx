import React, { useState } from "react";
import {
    Grid,
    Container,
    MenuItem,
    Select,
    Stack,
    FormControl,
    InputLabel,
    TextField,
    Button,
    Typography,
} from "@mui/material";
import OrganizerItem from "./OrganizerItem";

const OrganizersList = ({
    employees,
    availableEmployees,
    addEmployeeHandler,
    createEmployeeHandler,
    removeEmployeeHandler,
}) => {
    const [creationToggle, setCreationToggle] = useState(false);
    const [createdEmployee, setCreatedEmployee] = useState({
        lastName: "",
        firstName: "",
        patronymic: "",
    });

    const createEmployee = () => {
        createEmployeeHandler(createdEmployee);
        setCreationToggle(false);
    };

    const cancelCreation = () => {
        setCreationToggle(false);
    };

    return (
        <Stack gap={1} marginTop={1}>
            {employees.map((emp) => (
                <OrganizerItem
                    key={emp.id}
                    organizer={emp}
                    removeHandler={removeEmployeeHandler}
                />
            ))}
            <FormControl fullWidth>
                <InputLabel id="department-label">
                    Добавить организавтора
                </InputLabel>
                <Select
                    fullWidth
                    labelId="department-label"
                    id="department-select"
                    label="Добавить организавтора"
                    value={""}
                >
                    {availableEmployees.length > 0 ? (
                        availableEmployees.map((emp) => (
                            <MenuItem
                                key={emp.id}
                                value={`${emp.lastName} ${emp.firstName} ${emp.patronymic}`}
                                onClick={(e) =>
                                    addEmployeeHandler(e.target.innerText)
                                }
                            >
                                {`${emp.lastName} ${emp.firstName} ${emp.patronymic}`}
                            </MenuItem>
                        ))
                    ) : (
                        <MenuItem key={1}>Нет доступных организаторов</MenuItem>
                    )}
                </Select>
            </FormControl>
            <Container style={{ padding: 0, justifyContent: "flex-start" }}>
                {creationToggle ? (
                    <FormControl fullWidth>
                        <Typography variant="h6">Новый организатор</Typography>
                        <Grid container gap={1}>
                            <Grid item xs>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label="Фамилия"
                                    value={createdEmployee.lastName}
                                    onChange={(e) =>
                                        setCreatedEmployee({
                                            ...createdEmployee,
                                            lastName: e.target.value,
                                        })
                                    }
                                ></TextField>
                            </Grid>
                            <Grid item xs>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label="Имя"
                                    value={createdEmployee.firstName}
                                    onChange={(e) =>
                                        setCreatedEmployee({
                                            ...createdEmployee,
                                            firstName: e.target.value,
                                        })
                                    }
                                ></TextField>
                            </Grid>
                            <Grid item xs>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label="Отчество"
                                    value={createdEmployee.patronymic}
                                    onChange={(e) =>
                                        setCreatedEmployee({
                                            ...createdEmployee,
                                            patronymic: e.target.value,
                                        })
                                    }
                                ></TextField>
                            </Grid>
                        </Grid>
                        <Grid container marginTop={2} marginBottom={2} gap={2}>
                            <Grid item xs={2}>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    color="primary"
                                    onClick={createEmployee}
                                >
                                    Создать
                                </Button>
                            </Grid>
                            <Grid item xs={2}>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    color="error"
                                    onClick={cancelCreation}
                                >
                                    Отмена
                                </Button>
                            </Grid>
                        </Grid>
                    </FormControl>
                ) : (
                    <Grid container marginTop={2} marginBottom={2}>
                        <Grid item xs>
                            <Button
                                variant="outlined"
                                onClick={() => setCreationToggle(true)}
                            >
                                Новый организатор
                            </Button>
                        </Grid>
                    </Grid>
                )}
            </Container>
        </Stack>
    );
};

export default OrganizersList;
