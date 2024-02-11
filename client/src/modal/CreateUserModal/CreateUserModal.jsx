import React from "react";
import { Dialog, Typography, Button, TextField, Radio, RadioGroup, FormControlLabel } from "@mui/material";
import { useFormik } from "formik";
import { postUser } from "../../api/userApi";

const CreateUserModal = ({ open, closeHandler, errorCallback, successCallback }) => {
    const formik = useFormik({
        initialValues: {
            email: "",
            role: "user",
            lastName: "",
            firstName: "",
            patronymic: "",
        },
        validate: ({ email, role, lastName, firstName, patronymic }) => {
            const errors = {};

            if (!email) {
                errors.email = "Обязательное поле";
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
                errors.email = "Некорректный адрес";
            }

            if (!lastName) {
                errors.lastName = "Обязательное поле";
            } else if (lastName.length > 50) {
                errors.lastName = "Длина не более 50 символов";
            }

            if (!firstName) {
                errors.firstName = "Обязательное поле";
            } else if (firstName.length > 50) {
                errors.firstName = "Длина не более 50 символов";
            }

            if (patronymic && patronymic.length > 50) {
                errors.patronymic = "Длина не более 50 символов";
            }

            return errors;
        },
        onSubmit: async (values) => {
            const response = await postUser(values);

            if (!response.status || response.status >= 300) {
                errorCallback(response.data.error);
                return;
            }

            successCallback(response.data);
            closeForm();
        },
    });

    const closeForm = () => {
        formik.resetForm();
        closeHandler();
    };

    return (
        <Dialog open={open} onClose={closeForm}>
            <Typography variant="h5" marginTop={2} marginBottom={1} textAlign={"center"}>
                Создание пользователя
            </Typography>
            <form onSubmit={formik.handleSubmit} style={{ padding: "0px 40px 16px 40px" }}>
                <TextField
                    id="email"
                    label="Эл.почта"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && formik.errors.email !== undefined}
                    helperText={
                        formik.touched.email && formik.errors.email !== undefined ? formik.errors.email : ""
                    }
                />
                <TextField
                    id="lastName"
                    label="Фамилия"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.lastName && formik.errors.lastName !== undefined}
                    helperText={
                        formik.touched.lastName && formik.errors.lastName !== undefined
                            ? formik.errors.lastName
                            : ""
                    }
                />
                <TextField
                    id="firstName"
                    label="Имя"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.firstName && formik.errors.firstName !== undefined}
                    helperText={
                        formik.touched.firstName && formik.errors.firstName !== undefined
                            ? formik.errors.firstName
                            : ""
                    }
                />
                <TextField
                    id="patronymic"
                    label="Отчество"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={formik.values.patronymic}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.patronymic && formik.errors.patronymic !== undefined}
                    helperText={
                        formik.touched.patronymic && formik.errors.patronymic !== undefined
                            ? formik.errors.patronymic
                            : ""
                    }
                />
                <RadioGroup name="role" row value={formik.values.role} onChange={formik.handleChange}>
                    <FormControlLabel value="user" control={<Radio />} label="Пользователь" />
                    <FormControlLabel value="admin" control={<Radio />} label="Администратор" />
                </RadioGroup>
                <Button type="submit" variant="contained" fullWidth style={{ height: "40px", marginTop: "10px" }}>
                    Создать
                </Button>
            </form>
        </Dialog>
    );
};

export default CreateUserModal;
