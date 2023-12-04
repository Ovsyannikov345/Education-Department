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

    useEffect(() => {
        const loadStudents = async () => {
            const response = await getStudents();

            if (response) {
                if (response.status < 300) {
                    setStudents(response.data);
                } else {
                    console.log("Error while loading students");
                }
            } else {
                console.log("Server did not respond.");
            }
        };

        loadStudents();
    }, []);

    const router = useNavigate();

    const changeSudent = (id) => {
        setOffense({
            ...offense,
            studentId: id,
            Student: students.find((std) => std.id === id),
        });
    };

    const createStudent = async () => {
        const response = await postStudent(newStudent);

        if (response) {
            if (response.status < 300) {
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
            } else {
                console.log("Error while creating the student");
            }
        } else {
            console.log("Server did not respond");
        }
    };

    const submit = async (e) => {
        e.preventDefault();

        const success = await creationHandler(offense);

        if (success) {
            router(OFFENSIVES_ROUTE);
        } else {
            // TODO view error.
        }
    };

    return (
        <>
            <IconButton
                color="primary"
                style={{ marginTop: 10, marginLeft: 10 }}
                onClick={() => router(OFFENSIVES_ROUTE)}
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
        </>
    );
};

export default CreateOffenseForm;
