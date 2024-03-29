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
import StudentItem from "./StudentItem";
import { useFormik } from "formik";
import validateStudent from "./../../utils/validateFunctions/validateStudent";

const StudentList = ({
    students,
    availableStudents,
    addStudentHandler,
    createStudentHandler,
    removeStudentHandler,
    deleteStudentHandler,
    readonly = false,
}) => {
    const formik = useFormik({
        initialValues: {
            lastName: "",
            firstName: "",
            patronymic: "",
            groupName: "",
        },
        validate: validateStudent,
        onSubmit: async (values) => {
            createStudentHandler(values);
            setCreationToggle(false);
            formik.resetForm();
        },
    });

    const [creationToggle, setCreationToggle] = useState(false);

    return (
        <Stack gap={1} marginTop={1}>
            {students.map((std) => (
                <StudentItem
                    key={std.id}
                    student={std}
                    removeHandler={removeStudentHandler}
                    deleteHandler={deleteStudentHandler}
                    readonly={readonly}
                />
            ))}
            {!readonly && (
                <>
                    <FormControl fullWidth>
                        <InputLabel id="student-label">
                            {availableStudents.length > 0 ? "Добавить студента" : "Нет доступных студентов"}
                        </InputLabel>
                        <Select
                            fullWidth
                            labelId="student-label"
                            id="student-select"
                            label={availableStudents.length > 0 ? "Добавить студента" : "Нет доступных студентов"}
                            readOnly={availableStudents.length === 0}
                            value={""}
                            onChange={(e) => addStudentHandler(e.target.value)}
                        >
                            {availableStudents.length > 0 &&
                                availableStudents.map((std) => (
                                    <MenuItem key={std.id} value={std.id}>
                                        {`${std.lastName} ${std.firstName} ${std.patronymic} (${std.groupName})`}
                                    </MenuItem>
                                ))}
                        </Select>
                    </FormControl>
                    <Container style={{ padding: 0, justifyContent: "flex-start" }}>
                        {creationToggle ? (
                            <FormControl fullWidth>
                                <Typography variant="h6">Новый студент</Typography>
                                <Grid container gap={1}>
                                    <Grid item xs={2}>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            label="Группа"
                                            id="groupName"
                                            name="groupName"
                                            value={formik.values.groupName}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={
                                                formik.touched.groupName && formik.errors.groupName !== undefined
                                            }
                                            helperText={
                                                formik.touched.groupName && formik.errors.groupName !== undefined
                                                    ? formik.errors.groupName
                                                    : ""
                                            }
                                        ></TextField>
                                    </Grid>
                                    <Grid item xs>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            label="Фамилия"
                                            id="lastName"
                                            name="lastName"
                                            value={formik.values.lastName}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={
                                                formik.touched.lastName && formik.errors.lastName !== undefined
                                            }
                                            helperText={
                                                formik.touched.lastName && formik.errors.lastName !== undefined
                                                    ? formik.errors.lastName
                                                    : ""
                                            }
                                        ></TextField>
                                    </Grid>
                                    <Grid item xs>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            label="Имя"
                                            id="firstName"
                                            name="firstName"
                                            value={formik.values.firstName}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={
                                                formik.touched.firstName && formik.errors.firstName !== undefined
                                            }
                                            helperText={
                                                formik.touched.firstName && formik.errors.firstName !== undefined
                                                    ? formik.errors.firstName
                                                    : ""
                                            }
                                        ></TextField>
                                    </Grid>
                                    <Grid item xs>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            label="Отчество"
                                            id="patronymic"
                                            name="patronymic"
                                            value={formik.values.patronymic}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={
                                                formik.touched.patronymic &&
                                                formik.errors.patronymic !== undefined
                                            }
                                            helperText={
                                                formik.touched.patronymic &&
                                                formik.errors.patronymic !== undefined
                                                    ? formik.errors.patronymic
                                                    : ""
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
                                            onClick={(e) => formik.handleSubmit(e)}
                                        >
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
                                        Новый студент
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

export default StudentList;
