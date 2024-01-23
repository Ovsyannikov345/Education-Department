import React, { useState } from "react";
import { TextField, Button, Link, Grid, Typography, Snackbar, Alert } from "@mui/material";
import { useFormik } from "formik";
import { login } from "../api/authApi";

const LoginPage = () => {
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const displayError = (message) => {
        setErrorMessage(message);
        setError(true);
    };

    const closeSnackbar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setError(false);
    };

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validate: ({ email, password }) => {
            const errors = {};

            if (!email) {
                errors.email = "Обязательное поле";
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
                errors.email = "Некорректный адрес";
            }

            if (!password) {
                errors.password = "Обязательное поле";
            }

            return errors;
        },
        onSubmit: ({ email, password }) => {
            login({ email: email, password: password })
                .then((response) => {
                    if (response.status < 400) {
                        localStorage.setItem("accessToken", response.data.accessToken);
                        localStorage.setItem("refreshToken", response.data.refreshToken);
                    } else {
                        displayError(response.data.error);
                    }
                })
                .catch(() => {
                    displayError("Сервис временно недоступен");
                });
        },
    });

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ marginTop: "100px" }}>
            <Grid container item xs={12} sm={6} md={4} xl={3} gap={2} maxWidth={"480px"}>
                <Typography variant="h4" width={"100%"} textAlign={"center"}>
                    Выполните вход
                </Typography>
                <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
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
                        id="password"
                        label="Пароль"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && formik.errors.password !== undefined}
                        helperText={
                            formik.touched.password && formik.errors.password !== undefined
                                ? formik.errors.password
                                : ""
                        }
                    />
                    {/* TODO implement */}
                    <Link href="/forgot-password" variant="body2" display={"block"}>
                        Забыли пароль?
                    </Link>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{ marginTop: "20px" }}
                    >
                        Войти
                    </Button>
                </form>
            </Grid>
            <Snackbar open={error} autoHideDuration={6000} onClose={closeSnackbar}>
                <Alert onClose={closeSnackbar} severity="error" sx={{ width: "100%" }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
        </Grid>
    );
};

export default LoginPage;
