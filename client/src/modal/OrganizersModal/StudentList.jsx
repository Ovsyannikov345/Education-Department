import React, { useEffect, useMemo, useState } from "react";
import {
    Grid,
    Container,
    MenuItem,
    Select,
    Stack,
    FormControl,
    InputLabel,
    Button,
    ListSubheader,
} from "@mui/material";
import StudentItem from "./StudentItem";
import { getGroups } from "../../api/groupApi";
import CreateStudentForm from "../../components/CreateStudentForm";

const StudentList = ({
    students,
    availableStudents,
    addStudentHandler,
    removeStudentHandler,
    deleteStudentHandler,
    displayError,
    readonly = false,
    errorCallback,
}) => {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        const loadGroups = async () => {
            const response = await getGroups();

            if (!response.status || response.status >= 300) {
                errorCallback(response.data.error);
                return;
            }

            setGroups(response.data);
        };

        loadGroups();
    }, []);

    const groupedAvailableStudents = useMemo(() => {
        if (!availableStudents || availableStudents.length === 0) {
            return [];
        }

        availableStudents.sort((a, b) =>
            [a.lastName, a.firstName, a.patronymic ?? ""]
                .join("")
                .localeCompare([b.lastName, b.firstName, b.patronymic ?? ""].join(""))
        );

        const groupNames = availableStudents.map((g) => g.groupName);

        const uniqueGroupNames = [...new Set(groupNames)];

        return uniqueGroupNames.map((name) => {
            return { groupName: name, students: availableStudents.filter((s) => s.groupName === name) };
        });
    }, [availableStudents]);

    const sortedStudents = useMemo(() => {
        if (!students || students.length === 0) {
            return [];
        }

        return students.sort((a, b) =>
            [a.Group.name, a.lastName, a.firstName, a.patronymic ?? ""]
                .join("")
                .localeCompare([b.Group.name, b.lastName, b.firstName, b.patronymic ?? ""].join(""))
        );
    }, [students]);

    useMemo(() => groups.sort((a, b) => a.name.localeCompare(b.name)), [groups]);

    const [creationToggle, setCreationToggle] = useState(false);

    const addStudent = (student) => {
        addStudentHandler(student);
        setCreationToggle(false);
    };

    return (
        <Stack gap={1} marginTop={1}>
            {sortedStudents.map((std) => (
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
                            {groupedAvailableStudents.length > 0 &&
                                groupedAvailableStudents.flatMap((group) => [
                                    <ListSubheader key={group.groupName}>{group.groupName}</ListSubheader>,
                                    ...group.students.map((std) => (
                                        <MenuItem key={std.id} value={std.id}>
                                            {`${std.lastName} ${std.firstName} ${std.patronymic}`}
                                        </MenuItem>
                                    )),
                                ])}
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
