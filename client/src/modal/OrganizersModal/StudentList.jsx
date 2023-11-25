import React, { useState } from "react";
import {
    Grid,
    Container,
    MenuItem,
    Select,
    Stack,
    FormControl,
    InputLabel,
    TextField,
    Button,
    Typography,
} from "@mui/material";
import StudentItem from "./StudentItem";

const StudentList = ({
    students,
    availableStudents,
    addStudentHandler,
    createStudentHandler,
    removeStudentHandler,
    deleteStudentHandler,
}) => {
    const [creationToggle, setCreationToggle] = useState(false);
    const [createdStudent, setCreatedStudent] = useState({
        lastName: "",
        firstName: "",
        patronymic: "",
        groupName: "",
    });

    const createStudent = () => {
        createStudentHandler(createdStudent);
        setCreationToggle(false);
        setCreatedStudent({
            lastName: "",
            firstName: "",
            patronymic: "",
            groupName: "",
        });
    };

    const cancelCreation = () => {
        setCreationToggle(false);
    };

    return (
        <Stack gap={1} marginTop={1}>
            {students.map((std) => (
                <StudentItem
                    key={std.id}
                    student={std}
                    removeHandler={removeStudentHandler}
                    deleteHandler={deleteStudentHandler}
                />
            ))}
            <FormControl fullWidth>
                <InputLabel id="student-label">Добавить студента</InputLabel>
                <Select
                    fullWidth
                    labelId="student-label"
                    id="student-select"
                    label="Добавить студента"
                    value={""}
                >
                    {availableStudents.length > 0 ? (
                        availableStudents.map((std) => (
                            <MenuItem
                                key={std.id}
                                value={`${std.groupName} ${std.lastName} ${std.firstName} ${std.patronymic}`}
                                onClick={(e) =>
                                    addStudentHandler(e.target.innerText)
                                }
                            >
                                {`${std.groupName} ${std.lastName} ${std.firstName} ${std.patronymic}`}
                            </MenuItem>
                        ))
                    ) : (
                        <MenuItem key={1}>Нет доступных студентов</MenuItem>
                    )}
                </Select>
            </FormControl>
            <Container style={{ padding: 0, justifyContent: "flex-start" }}>
                {creationToggle ? (
                    <FormControl fullWidth>
                        <Typography variant="h6">Новый студент</Typography>
                        <Grid container gap={1}>
                            <Grid item xs={2}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label="Группа"
                                    value={createdStudent.groupName}
                                    onChange={(e) =>
                                        setCreatedStudent({
                                            ...createdStudent,
                                            groupName: e.target.value,
                                        })
                                    }
                                ></TextField>
                            </Grid>
                            <Grid item xs>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label="Фамилия"
                                    value={createdStudent.lastName}
                                    onChange={(e) =>
                                        setCreatedStudent({
                                            ...createdStudent,
                                            lastName: e.target.value,
                                        })
                                    }
                                ></TextField>
                            </Grid>
                            <Grid item xs>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label="Имя"
                                    value={createdStudent.firstName}
                                    onChange={(e) =>
                                        setCreatedStudent({
                                            ...createdStudent,
                                            firstName: e.target.value,
                                        })
                                    }
                                ></TextField>
                            </Grid>
                            <Grid item xs>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label="Отчество"
                                    value={createdStudent.patronymic}
                                    onChange={(e) =>
                                        setCreatedStudent({
                                            ...createdStudent,
                                            patronymic: e.target.value,
                                        })
                                    }
                                ></TextField>
                            </Grid>
                        </Grid>
                        <Grid container marginTop={2} marginBottom={2} gap={2}>
                            <Grid item xs={2}>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    color="primary"
                                    onClick={createStudent}
                                >
                                    Создать
                                </Button>
                            </Grid>
                            <Grid item xs={2}>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    color="error"
                                    onClick={cancelCreation}
                                >
                                    Отмена
                                </Button>
                            </Grid>
                        </Grid>
                    </FormControl>
                ) : (
                    <Grid container marginTop={2} marginBottom={2}>
                        <Grid item xs>
                            <Button
                                variant="outlined"
                                onClick={() => setCreationToggle(true)}
                            >
                                Новый студент
                            </Button>
                        </Grid>
                    </Grid>
                )}
            </Container>
        </Stack>
    );
};

export default StudentList;
