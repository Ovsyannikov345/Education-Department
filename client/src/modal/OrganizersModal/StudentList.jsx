import React, { useEffect, useMemo, useState } from "react";
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
    ListSubheader,
    FormHelperText,
} from "@mui/material";
import StudentItem from "./StudentItem";
import { useFormik } from "formik";
import validateStudent from "./../../utils/validateFunctions/validateStudent";
import { getGroups } from "../../api/groupApi";

const StudentList = ({
    students,
    availableStudents,
    addStudentHandler,
    createStudentHandler,
    removeStudentHandler,
    deleteStudentHandler,
    readonly = false,
    errorCallback,
}) => {
    const formik = useFormik({
        initialValues: {
            lastName: "",
            firstName: "",
            patronymic: "",
            groupId: "",
        },
        validate: validateStudent,
        onSubmit: async (values) => {
            createStudentHandler(values);
            setCreationToggle(false);
            formik.resetForm();
        },
    });

    const [groups, setGroups] = useState([]);

    useEffect(() => {
        const loadGroups = async () => {
            const response = await getGroups();

            if (!response.status || response.status >= 300) {
                errorCallback(response.data.error);
                return;
            }

            setGroups(response.data);
            console.log(response.data);
        };

        loadGroups();
    }, []);

    const groupedAvailableStudents = useMemo(() => {
        if (!availableStudents || availableStudents.length === 0) {
            return [];
        }

        availableStudents.sort((a, b) =>
            [a.lastName, a.firstName, a.patronymic ?? ""]
                .join("")
                .localeCompare([b.lastName, b.firstName, b.patronymic ?? ""].join(""))
        );

        const groupNames = availableStudents.map((g) => g.groupName);

        const uniqueGroupNames = [...new Set(groupNames)];

        return uniqueGroupNames.map((name) => {
            return { groupName: name, students: availableStudents.filter((s) => s.groupName === name) };
        });
    }, [availableStudents]);

    const sortedStudents = useMemo(() => {
        if (!students || students.length === 0) {
            return [];
        }

        return students.sort((a, b) =>
            [a.Group.name, a.lastName, a.firstName, a.patronymic ?? ""]
                .join("")
                .localeCompare([b.Group.name, b.lastName, b.firstName, b.patronymic ?? ""].join(""))
        );
    }, [students]);

    useMemo(() => groups.sort((a, b) => a.name.localeCompare(b.name)), [groups]);

    const [creationToggle, setCreationToggle] = useState(false);

    return (
        <Stack gap={1} marginTop={1}>
            {sortedStudents.map((std) => (
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
                            {groupedAvailableStudents.length > 0 &&
                                groupedAvailableStudents.flatMap((group) => [
                                    <ListSubheader key={group.groupName}>{group.groupName}</ListSubheader>,
                                    ...group.students.map((std) => (
                                        <MenuItem key={std.id} value={std.id}>
                                            {`${std.lastName} ${std.firstName} ${std.patronymic}`}
                                        </MenuItem>
                                    )),
                                ])}
                        </Select>
                    </FormControl>
                    <Container style={{ padding: 0, justifyContent: "flex-start" }}>
                        {creationToggle ? (
                            <FormControl fullWidth>
                                <Typography variant="h6">Новый студент</Typography>
                                <Grid container gap={1}>
                                    <Grid item xs={2}>
                                        <FormControl fullWidth>
                                            <InputLabel
                                                id="group-label"
                                                error={
                                                    formik.touched.groupId && formik.errors.groupId !== undefined
                                                }
                                            >
                                                Группа
                                            </InputLabel>
                                            <Select
                                                fullWidth
                                                labelId="group-label"
                                                id="groupId"
                                                name="groupId"
                                                value={formik.values.groupId}
                                                renderValue={(value) => groups.find((g) => g.id === value).name}
                                                label="Группа"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={
                                                    formik.touched.groupId && formik.errors.groupId !== undefined
                                                }
                                            >
                                                {groups.map((g) => (
                                                    <MenuItem key={g.id} value={g.id}>
                                                        {g.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            <FormHelperText error>
                                                {formik.touched.groupId && formik.errors.groupId !== undefined
                                                    ? formik.errors.groupId
                                                    : ""}
                                            </FormHelperText>
                                        </FormControl>
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
