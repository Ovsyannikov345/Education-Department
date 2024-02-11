import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OFFENSIVES_ROUTE } from "../utils/consts";
import {
    Container,
    FormControl,
    FormHelperText,
    Grid,
    Typography,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Button,
    IconButton,
    Snackbar,
    Alert,
} from "@mui/material";
import BackIcon from "@mui/icons-material/ArrowBackIos";
import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import { getStudents } from "../api/studentsApi";
import { postOffense } from "../api/offensesApi";
import { useFormik } from "formik";
import validateOffense from "./../utils/validateFunctions/validateOffense";
import CreateStudentForm from "./CreateStudentForm";

const CreateOffenseForm = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            studentId: "",
            offenseDate: "",
            article: "",
            courtDecision: "",
            penalty: "",
        },
        validate: (values) => validateOffense(values),
        onSubmit: async (values) => {
            const response = await postOffense(values);

            if (!response.status || response.status >= 300) {
                displayError(response.data.error);
                return;
            }

            navigate(OFFENSIVES_ROUTE);
        },
    });

    const [students, setStudents] = useState([]);

    const [studentCreationToggle, setStudentCreationToggle] = useState(false);

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const displayError = (message) => {
        setErrorMessage(message);
        setError(true);
    };

    const displaySuccess = (message) => {
        setSuccessMessage(message);
        setSuccess(true);
    };

    const closeSnackbar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setSuccess(false);
        setError(false);
    };

    useEffect(() => {
        const loadStudents = async () => {
            const response = await getStudents();

            if (!response.status || response.status >= 300) {
                displayError(response.data.error);
            }

            setStudents(response.data);
        };

        loadStudents();
    }, []);

    return (
        <>
            <IconButton
                color="primary"
                style={{ marginTop: 10, marginLeft: 10 }}
                onClick={() => navigate(OFFENSIVES_ROUTE)}
            >
                <BackIcon></BackIcon>Список правонарушений
            </IconButton>
            <Container>
                <Grid container mb={3} justifyContent={"center"}>
                    <Grid container item xs={6} mt={2} rowGap={2} columnGap={2} alignItems={"baseline"}>
                        <Grid item xs={12}>
                            <Typography variant="h5">Создать правонарушение</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel
                                    id="student-label"
                                    error={formik.touched.studentId && formik.errors.studentId !== undefined}
                                >
                                    Студент
                                </InputLabel>
                                <Select
                                    fullWidth
                                    labelId="student-label"
                                    id="studentId"
                                    name="studentId"
                                    value={formik.values.studentId}
                                    renderValue={(value) => {
                                        const student = students.find((s) => s.id === value);

                                        return `${student.lastName} ${student.firstName} ${student.patronymic} (${student.groupName})`;
                                    }}
                                    label="Студент"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.studentId && formik.errors.studentId !== undefined}
                                >
                                    {students.map((s) => (
                                        <MenuItem key={s.id} value={s.id}>
                                            {`${s.lastName} ${s.firstName} ${s.patronymic} (${s.groupName})`}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText error>
                                    {formik.touched.studentId && formik.errors.studentId !== undefined
                                        ? formik.errors.studentId
                                        : ""}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        {!studentCreationToggle && (
                            <Grid item xs={12}>
                                <Button variant="outlined" onClick={() => setStudentCreationToggle(true)}>
                                    Новый студент
                                </Button>
                            </Grid>
                        )}
                        {studentCreationToggle && (
                            <CreateStudentForm
                                declineHandler={() => setStudentCreationToggle(false)}
                                successCallback={(createdStudent) => {
                                    setStudents([...students, createdStudent]);
                                    formik.setFieldValue("studentId", createdStudent.id);
                                    setStudentCreationToggle(false);
                                    displaySuccess("Студент создан");
                                }}
                                errorCallback={(errorMessage) => displayError(errorMessage)}
                            />
                        )}
                        <Grid item xs={12}>
                            <DatePicker
                                label="Дата совершения"
                                value={formik.values.offenseDate ? moment(formik.values.offenseDate) : null}
                                disableFuture
                                onChange={(newDate) =>
                                    formik.setFieldValue(
                                        "offenseDate",
                                        moment(newDate).format("YYYY-MM-DD"),
                                        true
                                    )
                                }
                                onBlur={formik.handleBlur}
                                slotProps={{
                                    textField: {
                                        error:
                                            formik.touched.offenseDate && formik.errors.offenseDate !== undefined,
                                        helperText:
                                            formik.touched.offenseDate && formik.errors.offenseDate !== undefined
                                                ? formik.errors.offenseDate
                                                : "",
                                    },
                                }}
                            ></DatePicker>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Статья"
                                id="article"
                                name="article"
                                multiline
                                maxRows={2}
                                value={formik.values.article}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.article && formik.errors.article !== undefined}
                                helperText={
                                    formik.touched.article && formik.errors.article !== undefined
                                        ? formik.errors.article
                                        : ""
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Решение суда"
                                id="courtDecision"
                                name="courtDecision"
                                multiline
                                maxRows={7}
                                value={formik.values.courtDecision}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.courtDecision && formik.errors.courtDecision !== undefined}
                                helperText={
                                    formik.touched.courtDecision && formik.errors.courtDecision !== undefined
                                        ? formik.errors.courtDecision
                                        : ""
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Взыскание"
                                id="penalty"
                                name="penalty"
                                multiline
                                maxRows={2}
                                value={formik.values.penalty}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.penalty && formik.errors.penalty !== undefined}
                                helperText={
                                    formik.touched.penalty && formik.errors.penalty !== undefined
                                        ? formik.errors.penalty
                                        : ""
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                fullWidth
                                variant="contained"
                                style={{ padding: 10 }}
                                onClick={formik.handleSubmit}
                            >
                                Создать
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
            <Snackbar open={error} autoHideDuration={6000} onClose={closeSnackbar}>
                <Alert onClose={closeSnackbar} severity="error" sx={{ width: "100%" }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
            <Snackbar open={success} autoHideDuration={6000} onClose={closeSnackbar}>
                <Alert onClose={closeSnackbar} severity="success" sx={{ width: "100%" }}>
                    {successMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default CreateOffenseForm;
