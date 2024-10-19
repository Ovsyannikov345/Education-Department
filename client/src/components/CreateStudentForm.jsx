import React, { useState, useEffect, useMemo } from "react";
import { FormControl, Grid, TextField, Button, Select, FormHelperText, MenuItem, InputLabel, Typography } from "@mui/material";
import { postStudent } from "../api/studentsApi";
import { useFormik } from "formik";
import validateStudent from "../utils/validateFunctions/validateStudent";
import { createGroup, getGroups } from "../api/groupApi";
import GroupCreationForm from "./GroupCreationForm";

const CreateStudentForm = ({ declineHandler, successCallback, errorCallback }) => {
    const [groups, setGroups] = useState([]);

    const formik = useFormik({
        initialValues: {
            lastName: "",
            firstName: "",
            patronymic: "",
            groupId: "",
        },
        validate: validateStudent,
        onSubmit: async (values) => {
            const response = await postStudent(values);

            if (!response.status || response.status >= 300) {
                errorCallback?.(response.data.error);
                return;
            }

            const createdStudent = response.data;
            createdStudent.Group = groups.find((g) => g.id === createdStudent.groupId);
            createdStudent.groupName = createdStudent.Group.name;

            successCallback?.(createdStudent);
        },
    });

    useEffect(() => {
        const loadGroups = async () => {
            const response = await getGroups();

            if (!response.status || response.status >= 300) {
                errorCallback?.(response.data.error);
            }

            setGroups(response.data);
        };

        const loadData = async () => {
            await loadGroups();
        };

        loadData();
    }, [errorCallback]);

    const sortedGroups = useMemo(() => {
        return groups.sort((a, b) => a.name.localeCompare(b.name));
    }, [groups]);

    const [groupCreationToggle, setGroupCreationToggle] = useState(false);

    const createNewGroup = async (group) => {
        const response = await createGroup(group);

        if (!response.status || response.status >= 300) {
            errorCallback(response.data.error);
            return;
        }

        const createdGroup = response.data;

        setGroupCreationToggle(false);

        groups.push(createdGroup);
        formik.setFieldValue("groupId", createdGroup.id);
    };

    const decline = () => {
        formik.resetForm();
        declineHandler();
    };

    return (
        <FormControl fullWidth>
            <Grid container item xs={12} spacing={1}>
                <Grid item xs={12}>
                    <Typography variant="h6">Новый студент</Typography>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <InputLabel id="group-label" error={formik.touched.groupId && formik.errors.groupId !== undefined}>
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
                            error={formik.touched.groupId && formik.errors.groupId !== undefined}
                        >
                            {sortedGroups.map((g) => (
                                <MenuItem key={g.id} value={g.id}>
                                    {g.name}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText error>
                            {formik.touched.groupId && formik.errors.groupId !== undefined ? formik.errors.groupId : ""}
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={6}></Grid>
                <Grid item container xs={6} alignItems={"flex-start"} gap={"10px"}>
                    {groupCreationToggle ? (
                        <GroupCreationForm
                            createCallback={createNewGroup}
                            declineCallback={() => setGroupCreationToggle(false)}
                            errorCallback={errorCallback}
                        />
                    ) : (
                        <Button variant="outlined" onClick={() => setGroupCreationToggle(true)}>
                            Создать группу
                        </Button>
                    )}
                </Grid>
                <Grid item xs={6}></Grid>
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
                        helperText={formik.touched.lastName && formik.errors.lastName !== undefined ? formik.errors.lastName : ""}
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
                            formik.touched.patronymic && formik.errors.patronymic !== undefined ? formik.errors.patronymic : ""
                        }
                    ></TextField>
                </Grid>
                <Grid container item xs={12} gap={2}>
                    <Grid item>
                        <Button variant="outlined" onClick={formik.handleSubmit}>
                            Создать
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" color="error" onClick={decline}>
                            Отмена
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </FormControl>
    );
};

export default CreateStudentForm;
