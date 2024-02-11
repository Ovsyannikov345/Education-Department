import React from "react";
import { FormControl, Grid, TextField, Button } from "@mui/material";
import { postStudent } from "../api/studentsApi";
import { useFormik } from "formik";
import validateStudent from "../utils/validateFunctions/validateStudent";

const CreateStudentForm = ({ declineHandler, successCallback, errorCallback }) => {
    const formik = useFormik({
        initialValues: {
            lastName: "",
            firstName: "",
            patronymic: "",
            groupName: "",
        },
        validate: validateStudent,
        onSubmit: async (values) => {
            console.log(values);
            const response = await postStudent(values);

            if (!response.status || response.status >= 300) {
                errorCallback?.(response.data.error);
                return;
            }

            const createdStudent = response.data;

            successCallback?.(createdStudent);
        },
    });

    const decline = () => {
        formik.resetForm();
        declineHandler();
    };

    return (
        <FormControl fullWidth>
            <Grid container item xs={12} gap={1}>
                <Grid item xs={5.9}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Группа"
                        id="groupName"
                        name="groupName"
                        value={formik.values.groupName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.groupName && formik.errors.groupName !== undefined}
                        helperText={
                            formik.touched.groupName && formik.errors.groupName !== undefined
                                ? formik.errors.groupName
                                : ""
                        }
                    ></TextField>
                </Grid>
                <Grid item xs={5.9}>
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
                            formik.touched.lastName && formik.errors.lastName !== undefined
                                ? formik.errors.lastName
                                : ""
                        }
                    ></TextField>
                </Grid>
                <Grid item xs={5.9}>
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
                            formik.touched.firstName && formik.errors.firstName !== undefined
                                ? formik.errors.firstName
                                : ""
                        }
                    ></TextField>
                </Grid>
                <Grid item xs={5.9}>
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
