import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { getOffense, putOffense } from "../api/offensesApi";
import { getStudents } from "../api/studentsApi";
import { useFormik } from "formik";
import validateOffense from "../utils/validateFunctions/validateOffense";
import CreateStudentForm from "../components/CreateStudentForm";

const OffenseDetailsPage = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            id: "",
            studentId: "",
            offenseDate: "",
            article: "",
            courtDecision: "",
            penalty: "",
        },
        validate: (values) => validateOffense(values),
        onSubmit: async (values) => {
            const response = await putOffense(values);

            if (!response.status || response.status >= 300) {
                displayError(response.data.error);
                return;
            }

            setInitialOffense(values);
            setEditModeToggle(false);
            setStudentCreationToggle(false);
            displaySuccess("Правонарушение изменено");
        },
    });

    const [initialOffense, setInitialOffense] = useState({});

    const [students, setStudents] = useState([]);

    const [editModeToggle, setEditModeToggle] = useState(false);

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
        const loadOffense = async () => {
            const response = await getOffense(id);

            if (!response.status || response.status >= 300) {
                displayError(response.data.error);
                return;
            }

            const { Student, ...offense } = response.data;

            formik.setValues(offense);
            setInitialOffense(offense);
        };

        const loadStudents = async () => {
            const response = await getStudents();

            if (!response.status || response.status >= 300) {
                displayError(response.data.error);
                return;
            }

            setStudents(response.data);
        };

        loadStudents().then(() => {
            loadOffense();
        });
    }, [id]);

    const resetChanges = () => {
        formik.setValues(initialOffense);
        setEditModeToggle(false);
        setStudentCreationToggle(false);
    };

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
                        <Grid container item xs={12}>
                            <Grid item xs>
                                <Typography variant="h5">Детали правонарушения</Typography>
                            </Grid>
                            <Grid container item xs>
                                {!editModeToggle && (
                                    <Grid item xs={2}>
                                        <Button variant="outlined" onClick={() => setEditModeToggle(true)}>
                                            Редактировать
                                        </Button>
                                    </Grid>
                                )}
                                {editModeToggle && (
                                    <>
                                        <Grid item xs>
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                onClick={formik.handleSubmit}
                                            >
                                                Сохранить
                                            </Button>
                                        </Grid>
                                        <Grid item xs>
                                            <Button variant="outlined" color="error" onClick={resetChanges}>
                                                Отмена
                                            </Button>
                                        </Grid>
                                    </>
                                )}
                            </Grid>
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
                                    readOnly={!editModeToggle}
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
                        {!studentCreationToggle && editModeToggle && (
                            <Grid item xs={12}>
                                <Button variant="outlined" onClick={() => setStudentCreationToggle(true)}>
                                    Новый студент
                                </Button>
                            </Grid>
                        )}
                        {studentCreationToggle && editModeToggle && (
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
                                readOnly={!editModeToggle}
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
                                InputProps={{ readOnly: !editModeToggle }}
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
                                InputProps={{ readOnly: !editModeToggle }}
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
                                InputProps={{ readOnly: !editModeToggle }}
                            />
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

export default OffenseDetailsPage;
