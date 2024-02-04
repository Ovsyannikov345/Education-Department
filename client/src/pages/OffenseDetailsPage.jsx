import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { getOffense, putOffense } from "../api/offensesApi";
import { getStudents, postStudent } from "../api/studentsApi";

const OffenseDetailsPage = () => {
    const [offense, setOffense] = useState({
        id: null,
        studentId: null,
        Student: null,
        offenseDate: null,
        article: "",
        courtDecision: "",
        penalty: "",
    });

    const [students, setStudents] = useState([]);

    const [editModeToggle, setEditModeToggle] = useState(false);
    const [editedOffense, setEditedOffense] = useState({
        id: null,
        studentId: null,
        Student: null,
        offenseDate: null,
        article: "",
        courtDecision: "",
        penalty: "",
    });

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

    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        const loadOffense = async () => {
            const response = await getOffense(id);

            if (!response.status || response.status >= 300) {
                displayError(response.data.error);
                return;
            }

            setOffense(response.data);
        };

        const loadStudents = async () => {
            const response = await getStudents();

            if (!response.status || response.status >= 300) {
                displayError(response.data.error);
                return;
            }

            setStudents(response.data);
        };

        loadOffense().then(() => {
            loadStudents();
        });
    }, [id]);

    useEffect(() => {
        setEditedOffense({ ...offense });
    }, [offense]);

    const changeSudent = (id) => {
        setEditedOffense({
            ...editedOffense,
            studentId: id,
            Student: students.find((std) => std.id === id),
        });
    };

    const createStudent = async () => {
        const response = await postStudent(newStudent);

        if (!response.status || response.status >= 300) {
            displayError(response.data.error);
            return;
        }

        const createdStudent = response.data;

        setStudents([...students, createdStudent]);
        setEditedOffense({
            ...editedOffense,
            studentId: createdStudent.id,
            Student: createdStudent,
        });

        setStudentCreationToggle(false);
        setNewStudent({ lastName: "", firstName: "", patronymic: "", groupName: "" });
        displaySuccess("Студент создан");
    };

    const applyChanges = async () => {
        const response = await putOffense(editedOffense);

        if (!response.status || response.status >= 300) {
            displayError(response.data.error);
            return;
        }

        setOffense(editedOffense);
        setEditModeToggle(false);
        displaySuccess("Правонарушение изменено");
    };

    const declineChanges = () => {
        setEditedOffense(offense);
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
                <Grid container mb={3}>
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
                                                onClick={() => applyChanges()}
                                            >
                                                Сохранить
                                            </Button>
                                        </Grid>
                                        <Grid item xs>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                onClick={() => declineChanges()}
                                            >
                                                Отмена
                                            </Button>
                                        </Grid>
                                    </>
                                )}
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="student-label">Студент</InputLabel>
                                <Select
                                    fullWidth
                                    labelId="student-label"
                                    id="student-select"
                                    value={students.length > 0 ? editedOffense.studentId ?? "" : ""}
                                    readOnly={!editModeToggle}
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
                        {!studentCreationToggle && editModeToggle && (
                            <Grid item xs={12}>
                                <Button variant="outlined" onClick={() => setStudentCreationToggle(true)}>
                                    Новый студент
                                </Button>
                            </Grid>
                        )}
                        {studentCreationToggle && editModeToggle && (
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
                                readOnly={!editModeToggle}
                                value={
                                    editedOffense.offenseDate != null
                                        ? moment(editedOffense.offenseDate, "YYYY-MM-DD")
                                        : null
                                }
                                onChange={(newDate) =>
                                    setEditedOffense({
                                        ...editedOffense,
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
                                InputProps={{ readOnly: !editModeToggle }}
                                value={editedOffense.article}
                                onChange={(e) => setEditedOffense({ ...editedOffense, article: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Решение суда"
                                multiline
                                maxRows={7}
                                InputProps={{ readOnly: !editModeToggle }}
                                value={editedOffense.courtDecision}
                                onChange={(e) =>
                                    setEditedOffense({ ...editedOffense, courtDecision: e.target.value })
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Взыскание"
                                multiline
                                maxRows={2}
                                InputProps={{ readOnly: !editModeToggle }}
                                value={editedOffense.penalty}
                                onChange={(e) => setEditedOffense({ ...editedOffense, penalty: e.target.value })}
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
