import React from "react";
import { Dialog, Typography, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { changeUserPassword } from "../../api/userApi";
import { logout } from "../../api/authApi";

const ChangePasswordModal = ({ open, closeHandler, errorCallback, successCallback }) => {
    const formik = useFormik({
        initialValues: {
            oldPassword: "",
            newPassword: "",
            newPasswordRepeat: "",
        },
        validate: ({ oldPassword, newPassword, newPasswordRepeat }) => {
            const errors = {};

            if (!oldPassword) {
                errors.oldPassword = "Обязательное поле";
            }

            if (!newPassword) {
                errors.newPassword = "Обязательное поле";
            }

            if (oldPassword && newPassword && oldPassword === newPassword) {
                errors.newPassword = "Пароли должны отличаться";
            }

            if (newPassword && newPassword !== newPasswordRepeat) {
                errors.newPasswordRepeat = "Пароли не совпадают";
            }

            return errors;
        },
        onSubmit: async (values) => {
            const response = await changeUserPassword({
                oldPassword: values.oldPassword,
                newPassword: values.newPassword,
            });

            if (!response.status || response.status >= 300) {
                errorCallback(response.data.error);
                return;
            }

            successCallback("Пароль изменен");
            closeForm();
            setTimeout(async () => {
                await logout();
                localStorage.clear();
                window.location.reload();
            }, 2000);
        },
    });

    const closeForm = () => {
        formik.resetForm();
        closeHandler();
    };

    return (
        <Dialog open={open} onClose={closeForm}>
            <Typography variant="h5" marginTop={2} marginBottom={1} textAlign={"center"}>
                Изменить пароль
            </Typography>
            <form onSubmit={formik.handleSubmit} style={{ padding: "0px 40px 16px 40px" }}>
                <TextField
                    id="oldPassword"
                    label="Старый пароль"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    type="password"
                    value={formik.values.oldPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.oldPassword && formik.errors.oldPassword !== undefined}
                    helperText={formik.touched.oldPassword && formik.errors.oldPassword !== undefined ? formik.errors.oldPassword : ""}
                />
                <TextField
                    id="newPassword"
                    label="Новый пароль"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    type="password"
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.newPassword && formik.errors.newPassword !== undefined}
                    helperText={formik.touched.newPassword && formik.errors.newPassword !== undefined ? formik.errors.newPassword : ""}
                />
                <TextField
                    id="newPasswordRepeat"
                    label="Повторите новый пароль"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    type="password"
                    value={formik.values.newPasswordRepeat}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.newPasswordRepeat && formik.errors.newPasswordRepeat !== undefined}
                    helperText={
                        formik.touched.newPasswordRepeat && formik.errors.newPasswordRepeat !== undefined ? formik.errors.newPasswordRepeat : ""
                    }
                />
                <Button type="submit" variant="contained" fullWidth style={{ height: "40px", marginTop: "10px" }}>
                    Изменить
                </Button>
            </form>
        </Dialog>
    );
};

export default ChangePasswordModal;
