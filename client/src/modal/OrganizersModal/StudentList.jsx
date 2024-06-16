import React, { useState } from "react";
import { Grid, Container, MenuItem, Select, Stack, FormControl, InputLabel, Button } from "@mui/material";
import CreateStudentForm from "../../components/CreateStudentForm";
import StudentItem from "./StudentItem";

const StudentList = ({
    students,
    availableStudents,
    addStudentHandler,
    removeStudentHandler,
    deleteStudentHandler,
    displayError,
    readonly = false,
}) => {
    const [creationToggle, setCreationToggle] = useState(false);

    const addStudent = (student) => {
        addStudentHandler(student);
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
                    readonly={readonly}
                />
            ))}
            {!readonly && (
                <>
                    <FormControl fullWidth>
                        <InputLabel id="student-label">
                            {availableStudents.length > 0 ? "Добавить студента" : "Нет доступных студентов"}
                        </InputLabel>
                        <Select
                            fullWidth
                            labelId="student-label"
                            id="student-select"
                            label={availableStudents.length > 0 ? "Добавить студента" : "Нет доступных студентов"}
                            readOnly={availableStudents.length === 0}
                            value={""}
                            onChange={(e) => addStudentHandler(availableStudents.find((s) => s.id === e.target.value))}
                        >
                            {availableStudents.length > 0 &&
                                availableStudents.map((std) => (
                                    <MenuItem key={std.id} value={std.id}>
                                        {`${std.lastName} ${std.firstName} ${std.patronymic} (${std.groupName})`}
                                    </MenuItem>
                                ))}
                        </Select>
                    </FormControl>
                    <Container style={{ padding: 0, justifyContent: "flex-start" }}>
                        {creationToggle ? (
                            <CreateStudentForm
                                declineHandler={() => setCreationToggle(false)}
                                successCallback={addStudent}
                                errorCallback={displayError}
                            />
                        ) : (
                            <Grid container marginTop={2} marginBottom={2}>
                                <Grid item xs>
                                    <Button variant="outlined" onClick={() => setCreationToggle(true)}>
                                        Новый студент
                                    </Button>
                                </Grid>
                            </Grid>
                        )}
                    </Container>
                </>
            )}
        </Stack>
    );
};

export default StudentList;
