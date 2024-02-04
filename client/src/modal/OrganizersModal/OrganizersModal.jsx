import { Dialog, Typography, Container, Tabs, Tab, Alert, Snackbar } from "@mui/material";
import React, { useState, useEffect } from "react";
import { getEmployees, postEmployee, deleteEmployee } from "../../api/employeeApi";
import { getStudents, postStudent, deleteStudent } from "../../api/studentsApi";
import EmployeeList from "./EmployeeList";
import StudentList from "./StudentList";

const OrganizersModal = ({
    isOpen,
    closeHandler,
    currentEmployees,
    addEmployeeHandler,
    removeEmployeeHandler,
    currentStudents,
    addStudentHandler,
    removeStudentHandler,
}) => {
    const [loadedEmployees, setLoadedEmployees] = useState([]);
    const [availableEmployees, setAvailableEmployees] = useState([]);

    const [loadedStudents, setLoadedStudents] = useState([]);
    const [availableStudents, setAvailableStudents] = useState([]);

    const [currentTabIndex, setCurrentTabIndex] = useState(0);

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

    const closeModal = () => {
        closeHandler();
    };

    useEffect(() => {
        const loadEmployees = async () => {
            const response = await getEmployees();

            if (!response.status || response.status >= 300) {
                displayError(response.data.error);
            }

            setLoadedEmployees(
                response.data.sort((a, b) =>
                    [a.lastName, a.firstName, a.patronymic]
                        .join("")
                        .localeCompare([b.lastName, b.firstName, b.patronymic].join(""))
                )
            );
        };

        const loadStudents = async () => {
            const response = await getStudents();

            if (!response.status || response.status >= 300) {
                displayError(response.data.error);
            }

            setLoadedStudents(
                response.data.sort((a, b) =>
                    [a.lastName, a.firstName, a.patronymic]
                        .join("")
                        .localeCompare([b.lastName, b.firstName, b.patronymic].join(""))
                )
            );
        };

        loadEmployees().then(() => {
            loadStudents();
        });
    }, []);

    useEffect(() => {
        setAvailableEmployees(loadedEmployees.filter((emp) => !currentEmployees.includes(emp)));
    }, [currentEmployees, loadedEmployees]);

    useEffect(() => {
        setAvailableStudents(loadedStudents.filter((std) => !currentStudents.includes(std)));
    }, [currentStudents, loadedStudents]);

    const changeTab = (e, tabIndex) => {
        setCurrentTabIndex(tabIndex);
    };

    const createEmployee = async (createdEmployee) => {
        const response = await postEmployee(createdEmployee);

        if (!response.status || response.status >= 300) {
            displayError(response.data.error);
        }

        addEmployeeHandler(response.data);
        setLoadedEmployees([...loadedEmployees, response.data]);
        displaySuccess("Сотрудник создан");
    };

    const createStudent = async (createdStudent) => {
        const response = await postStudent(createdStudent);

        if (!response.status || response.status >= 300) {
            displayError(response.data.error);
        }

        setLoadedStudents([...loadedStudents, response.data]);
        addStudentHandler(response.data);
        displaySuccess("Студент создан");
    };

    const addEmployee = (id) => {
        addEmployeeHandler(availableEmployees.find((emp) => emp.id === id));
    };

    const addStudent = (id) => {
        addStudentHandler(availableStudents.find((std) => std.id === id));
    };

    const removeEmployee = (id) => {
        removeEmployeeHandler(id);
    };

    const removeStudent = (id) => {
        removeStudentHandler(id);
    };

    const removeEmployeePermanent = async (id) => {
        const response = await deleteEmployee(id);

        if (!response.status || response.status >= 300) {
            displayError(response.data.error);
        }

        removeEmployeeHandler(id);
        setLoadedEmployees(loadedEmployees.filter((emp) => emp.id !== id));
        displaySuccess("Сотрудник удален");
    };

    const removeStudentPermanent = async (id) => {
        const response = await deleteStudent(id);

        if (!response.status || response.status >= 300) {
            displayError(response.data.error);
        }

        removeStudentHandler(id);
        setLoadedStudents(loadedStudents.filter((std) => std.id !== id));
        displaySuccess("Студент удален");
    };

    return (
        <>
            <Dialog fullWidth open={isOpen} onClose={closeModal}>
                <Typography variant="h5" paddingLeft={3} marginTop={1} textAlign={"center"}>
                    Организаторы мероприятия
                </Typography>
                <Container>
                    <Tabs centered value={currentTabIndex} onChange={changeTab}>
                        <Tab label="Сотрудники" />
                        <Tab label="Студенты" />
                    </Tabs>
                    {currentTabIndex === 0 && (
                        <EmployeeList
                            employees={currentEmployees}
                            availableEmployees={availableEmployees}
                            addEmployeeHandler={addEmployee}
                            createEmployeeHandler={createEmployee}
                            removeEmployeeHandler={removeEmployee}
                            deleteEmployeeHandler={removeEmployeePermanent}
                        />
                    )}
                    {currentTabIndex === 1 && (
                        <StudentList
                            students={currentStudents}
                            availableStudents={availableStudents}
                            addStudentHandler={addStudent}
                            createStudentHandler={createStudent}
                            removeStudentHandler={removeStudent}
                            deleteStudentHandler={removeStudentPermanent}
                        />
                    )}
                </Container>
            </Dialog>
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

export default OrganizersModal;
