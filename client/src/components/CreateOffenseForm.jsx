import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OFFENSIVES_ROUTE } from "../utils/consts";
import {
    Container,
    FormControl,
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
import { getStudents, postStudent } from "../api/studentsApi";

const CreateOffenseForm = ({ creationHandler }) => {
    const [offense, setOffense] = useState({
        studentId: null,
        Student: null,
        offenseDate: null,
        article: "",
        courtDecision: "",
        penalty: "",
    });

    const [students, setStudents] = useState([]);

    const [studentCreationToggle, setStudentCreationToggle] = useState(false);
    const [newStudent, setNewStudent] = useState({
        lastName: "",
        firstName: "",
        patronymic: "",
        groupName: "",
    });

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

    const navigate = useNavigate();

    const changeSudent = (id) => {
        setOffense({
            ...offense,
            studentId: id,
            Student: students.find((std) => std.id === id),
        });
    };

    const createStudent = async () => {
        const response = await postStudent(newStudent);

        if (!response.status || response.status >= 300) {
            displayError(response.data.error);
        }

        const createdStudent = response.data;

        setStudents([...students, createdStudent]);
        changeSudent(createdStudent.id);

        setStudentCreationToggle(false);
        setNewStudent({
            lastName: "",
            firstName: "",
            patronymic: "",
            groupName: "",
        });

        displaySuccess("Студент создан");
    };

    const submit = async (e) => {
        e.preventDefault();

        const errorMessage = await creationHandler(offense);

        if (errorMessage === "") {
            navigate(OFFENSIVES_ROUTE);
        } else {
            displayError(errorMessage);
        }
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
                <Grid container mb={3}>
                    <Grid container item xs={6} mt={2} rowGap={2} columnGap={2} alignItems={"baseline"}>
                        <Grid item xs={12}>
                            <Typography variant="h5">Создать правонарушение</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="student-label">Студент</InputLabel>
                                <Select
                                    fullWidth
                                    labelId="student-label"
                                    id="student-select"
                                    value={offense.studentId ?? ""}
                                    label="Студент"
                                    onChange={(e) => changeSudent(e.target.value)}
                                >
                                    {students.map((std) => (
                                        <MenuItem key={std.id} value={std.id}>
                                            {`${std.lastName} ${std.firstName} ${std.patronymic} ${std.groupName}`}
                                        </MenuItem>
                                    ))}
                                </Select>
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
                            <FormControl fullWidth>
                                <Grid container item xs={12} gap={1}>
                                    <Grid item xs={5.9}>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            label="Фамилия"
                                            value={newStudent.lastName}
                                            onChange={(e) =>
                                                setNewStudent({
                                                    ...newStudent,
                                                    lastName: e.target.value,
                                                })
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={5.9}>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            label="Имя"
                                            value={newStudent.firstName}
                                            onChange={(e) =>
                                                setNewStudent({
                                                    ...newStudent,
                                                    firstName: e.target.value,
                                                })
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={5.9}>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            label="Отчество"
                                            value={newStudent.patronymic}
                                            onChange={(e) =>
                                                setNewStudent({
                                                    ...newStudent,
                                                    patronymic: e.target.value,
                                                })
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={5.9}>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            label="Группа"
                                            placeholder="Название-Номер"
                                            value={newStudent.groupName}
                                            onChange={(e) =>
                                                setNewStudent({
                                                    ...newStudent,
                                                    groupName: e.target.value,
                                                })
                                            }
                                        />
                                    </Grid>
                                    <Grid container item xs={12} gap={2}>
                                        <Grid item>
                                            <Button variant="outlined" onClick={() => createStudent()}>
                                                Создать
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                onClick={() => setStudentCreationToggle(false)}
                                            >
                                                Отмена
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </FormControl>
                        )}
                        <Grid item xs={12}>
                            <DatePicker
                                label="Дата совершения"
                                value={
                                    offense.offenseDate != null ? moment(offense.offenseDate, "YYYY-MM-DD") : null
                                }
                                onChange={(newDate) =>
                                    setOffense({
                                        ...offense,
                                        offenseDate: moment(newDate).format("YYYY-MM-DD"),
                                    })
                                }
                            ></DatePicker>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Статья"
                                multiline
                                maxRows={2}
                                value={offense.article}
                                onChange={(e) => setOffense({ ...offense, article: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Решение суда"
                                multiline
                                maxRows={7}
                                value={offense.courtDecision}
                                onChange={(e) => setOffense({ ...offense, courtDecision: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Взыскание"
                                multiline
                                maxRows={2}
                                value={offense.penalty}
                                onChange={(e) => setOffense({ ...offense, penalty: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button fullWidth variant="contained" style={{ padding: 10 }} onClick={submit}>
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
