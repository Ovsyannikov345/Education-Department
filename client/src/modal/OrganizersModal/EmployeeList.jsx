import React, { useMemo, useState } from "react";
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
import EmployeeItem from "./EmployeeItem";
import { useFormik } from "formik";
import validateEmployee from "./../../utils/validateFunctions/validateEmployee";

const EmployeeList = ({
    employees,
    availableEmployees,
    addEmployeeHandler,
    createEmployeeHandler,
    removeEmployeeHandler,
    deleteEmployeeHandler,
    readonly = false,
}) => {
    const formik = useFormik({
        initialValues: {
            lastName: "",
            firstName: "",
            patronymic: "",
        },
        validate: validateEmployee,
        onSubmit: async (values) => {
            createEmployeeHandler(values);
            setCreationToggle(false);
            formik.resetForm();
        },
    });

    const [creationToggle, setCreationToggle] = useState(false);

    useMemo(() => {
        employees.sort((a, b) =>
            [a.lastName, a.firstName, a.patronymic ?? ""]
                .join("")
                .localeCompare([b.lastName, b.firstName, b.patronymic ?? ""].join(""))
        );
    }, [employees]);

    useMemo(() => {
        availableEmployees.sort((a, b) =>
            [a.lastName, a.firstName, a.patronymic ?? ""]
                .join("")
                .localeCompare([b.lastName, b.firstName, b.patronymic ?? ""].join(""))
        );
    }, [availableEmployees]) 

    return (
        <Stack gap={1} marginTop={1}>
            {employees.map((e) => (
                <EmployeeItem
                    key={e.id}
                    employee={e}
                    removeHandler={removeEmployeeHandler}
                    deleteHandler={deleteEmployeeHandler}
                    readonly={readonly}
                />
            ))}
            {!readonly && (
                <>
                    <FormControl fullWidth>
                        <InputLabel id="employee-label">
                            {availableEmployees.length > 0 ? "Добавить организавтора" : "Нет доступных организаторов"}
                        </InputLabel>
                        <Select
                            fullWidth
                            labelId="employee-label"
                            id="employee-select"
                            label={availableEmployees.length > 0 ? "Добавить организатора" : "Нет доступных организаторов"}
                            readOnly={availableEmployees.length === 0}
                            value={""}
                            onChange={(e) => addEmployeeHandler(e.target.value)}
                        >
                            {availableEmployees.length > 0 &&
                                availableEmployees.map((e) => (
                                    <MenuItem key={e.id} value={e.id}>
                                        {`${e.lastName} ${e.firstName} ${e.patronymic}`}
                                    </MenuItem>
                                ))}
                        </Select>
                    </FormControl>
                    <Container style={{ padding: 0, justifyContent: "flex-start" }}>
                        {creationToggle ? (
                            <FormControl fullWidth>
                                <Typography variant="h6">Новый организатор</Typography>
                                <Grid container spacing={1}>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            label="Фамилия"
                                            id="lastName"
                                            name="lastName"
                                            value={formik.values.lastName}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.lastName && formik.errors.lastName !== undefined}
                                            helperText={
                                                formik.touched.lastName && formik.errors.lastName !== undefined ? formik.errors.lastName : ""
                                            }
                                        ></TextField>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            label="Имя"
                                            id="firstName"
                                            name="firstName"
                                            value={formik.values.firstName}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.firstName && formik.errors.firstName !== undefined}
                                            helperText={
                                                formik.touched.firstName && formik.errors.firstName !== undefined ? formik.errors.firstName : ""
                                            }
                                        ></TextField>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            label="Отчество"
                                            id="patronymic"
                                            name="patronymic"
                                            value={formik.values.patronymic}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.patronymic && formik.errors.patronymic !== undefined}
                                            helperText={
                                                formik.touched.patronymic && formik.errors.patronymic !== undefined
                                                    ? formik.errors.patronymic
                                                    : ""
                                            }
                                        ></TextField>
                                    </Grid>
                                </Grid>
                                <Grid container marginTop={2} marginBottom={2} gap={2}>
                                    <Grid item xs={2}>
                                        <Button fullWidth variant="outlined" color="primary" onClick={(e) => formik.handleSubmit(e)}>
                                            Создать
                                        </Button>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Button
                                            type="reset"
                                            fullWidth
                                            variant="outlined"
                                            color="error"
                                            onClick={(e) => {
                                                formik.handleReset(e);
                                                setCreationToggle(false);
                                            }}
                                        >
                                            Отмена
                                        </Button>
                                    </Grid>
                                </Grid>
                            </FormControl>
                        ) : (
                            <Grid container marginTop={2} marginBottom={2}>
                                <Grid item xs>
                                    <Button variant="outlined" onClick={() => setCreationToggle(true)}>
                                        Новый организатор
                                    </Button>
                                </Grid>
                            </Grid>
                        )}
                    </Container>
                </>
            )}
        </Stack>
    );
};

export default EmployeeList;
