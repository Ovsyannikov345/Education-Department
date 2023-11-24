import { Dialog, Typography, Container } from "@mui/material";
import React, { useState, useEffect } from "react";
import { getEmployees, postEmployee } from "../../api/employeeApi";
import OrganizersList from "./OrganizersList";

const OrganizersModal = ({
    isOpen,
    closeHandler,
    currentEmployees,
    addEmployeeHandler,
    removeEmployeeHandler,
}) => {
    const [loadedEmployees, setLoadedEmployees] = useState([]);
    const [availableEmployees, setAvailableEmployees] = useState([]);

    const closeModal = () => {
        closeHandler();
    };

    const loadEmployees = async () => {
        const loadedEmployees = await getEmployees();

        setLoadedEmployees(loadedEmployees);
    };

    useEffect(() => {
        loadEmployees();
    }, []);

    useEffect(() => {
        setAvailableEmployees(
            loadedEmployees.filter((emp) => !currentEmployees.includes(emp))
        );
    }, [currentEmployees, loadedEmployees]);

    const createEmployee = async (createdEmployee) => {
        const response = await postEmployee(createdEmployee);

        if (response.status === 200) {
            addEmployeeHandler(response.data);
        }
        else {
            console.log("Creation failed with code " + response.status);
        }
    };

    const addEmployee = (employeeString) => {
        const data = employeeString.split(" ");
        const employeeToAdd = availableEmployees.find(
            (emp) =>
                emp.lastName === data[0] &&
                emp.firstName === data[1] &&
                emp.patronymic === data[2]
        );

        addEmployeeHandler(employeeToAdd);
    };

    const removeEmployee = (id) => {
        removeEmployeeHandler(id);
    };

    return (
        <Dialog fullWidth open={isOpen} onClose={closeModal}>
            <Typography variant="h5" paddingLeft={3} marginTop={1}>
                Организаторы
            </Typography>
            <Container>
                <OrganizersList
                    employees={currentEmployees}
                    availableEmployees={availableEmployees}
                    addEmployeeHandler={addEmployee}
                    createEmployeeHandler={createEmployee}
                    removeEmployeeHandler={removeEmployee}
                ></OrganizersList>
            </Container>
        </Dialog>
    );
};

export default OrganizersModal;
