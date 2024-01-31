import { Dialog, Typography, Container, Tabs, Tab } from "@mui/material";
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

    const closeModal = () => {
        closeHandler();
    };

    const loadEmployees = async () => {
        const response = await getEmployees();

        if (response) {
            if (response.status < 300) {
                setLoadedEmployees(
                    response.data.sort((a, b) =>
                        [a.lastName, a.firstName, a.patronymic]
                            .join("")
                            .localeCompare([b.lastName, b.firstName, b.patronymic].join(""))
                    )
                );
            } else {
                console.log("Error while loading employees");
            }
        } else {
            console.log("Server did not respond");
        }
    };

    const loadStudents = async () => {
        const response = await getStudents();

        if (response) {
            if (response.status < 300) {
                setLoadedStudents(
                    response.data.sort((a, b) =>
                        [a.lastName, a.firstName, a.patronymic]
                            .join("")
                            .localeCompare([b.lastName, b.firstName, b.patronymic].join(""))
                    )
                );
            } else {
                console.log("Error while loading students");
            }
        } else {
            console.log("Server did not respond");
        }
    };

    useEffect(() => {
        loadEmployees();
        loadStudents();
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

        if (response) {
            if (response.status < 300) {
                console.log(response.data);
                addEmployeeHandler(response.data);
                setLoadedEmployees([...loadedEmployees, response.data]);
            } else {
                console.log("Error while creating the employee");
            }
        } else {
            console.log("Server did not respond");
        }
    };

    const createStudent = async (createdStudent) => {
        const response = await postStudent(createdStudent);

        if (response) {
            if (response.status < 300) {
                setLoadedStudents([...loadedStudents, response.data]);
                addStudentHandler(response.data);
            } else {
                console.log("Error while creating the student");
            }
        } else {
            console.log("Server did not respond");
        }
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

        if (response) {
            if (response.status < 300) {
                removeEmployeeHandler(id);
                setLoadedEmployees(loadedEmployees.filter((emp) => emp.id !== id));
            } else {
                console.log("Error while deleting the employee");
            }
        } else {
            console.log("Server did not respond");
        }
    };

    const removeStudentPermanent = async (id) => {
        const response = await deleteStudent(id);

        if (response) {
            if (response.status < 300) {
                removeStudentHandler(id);
                setLoadedStudents(loadedStudents.filter((std) => std.id !== id));
            } else {
                console.log("Error while deleting the student");
            }
        } else {
            console.log("Server did not respond");
        }
    };

    return (
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
    );
};

export default OrganizersModal;
