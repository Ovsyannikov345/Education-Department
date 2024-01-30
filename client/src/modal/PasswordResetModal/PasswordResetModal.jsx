import React from "react";
import { Dialog, Typography, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { sendNewPassword } from "../../api/userApi";

const PasswordResetModal = ({ open, closeHandler, errorCallback, successCallback }) => {
    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validate: ({ email }) => {
            const errors = {};

            if (!email) {
                errors.email = "Обязательное поле";
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
                errors.email = "Некорректный адрес";
            }

            return errors;
        },
        onSubmit: async (values) => {
            const response = await sendNewPassword(values.email);

            if (!response.status || response.status >= 300) {
                errorCallback(response.data.error);
                return;
            }

            successCallback("Новый пароль отправлен на эл.почту");
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
                Сбросить пароль
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
                <Button type="submit" variant="contained" fullWidth style={{ height: "40px", marginTop: "10px" }}>
                    Сбросить
                </Button>
            </form>
        </Dialog>
    );
};

export default PasswordResetModal;
