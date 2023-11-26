import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import moment from "moment";
import { getDepartments } from "../api/departmentsApi";
import { getDirections } from "../api/directionsApi";
import OrganizersModal from "../modal/OrganizersModal/OrganizersModal";
import ParticipantsModal from "../modal/ParticipantsModal/ParticipantsModal";

const CreateEventForm = ({ creationHandler }) => {
    const [event, setEvent] = useState({
        name: "",
        description: "",
        plannedResult: "",
        date: "",
        time: "",
        departmentId: null,
        subdepartmentId: null,
        directionId: null,
        subdirectionId: null,
        employees: [],
        students: [],
        participants: [],
    });

    const [departments, setDepartments] = useState([]);
    const [subdepartments, setSubdepartments] = useState([]);
    const [directions, setDirections] = useState([]);
    const [subdirections, setSubdirections] = useState([]);

    const [currentDepartment, setCurrentDepartment] = useState("");
    const [currentSubdepartment, setCurrentSubdepartment] = useState("");
    const [currentDirection, setCurrentDirection] = useState("");
    const [currentSubdirection, setCurrentSubdirection] = useState("");

    const [organizersModalOpen, setOrganizersModalOpen] = useState(false);
    const [participantsModalOpen, setParticipantsModalOpen] = useState(false);

    const loadDepartments = async () => {
        const departments = await getDepartments();
        setDepartments(departments);
    };

    const loadDirections = async () => {
        const directions = await getDirections();
        setDirections(directions);
    };

    useEffect(() => {
        loadDepartments();
        loadDirections();
    }, []);

    useEffect(() => {
        const selectedDepartment = departments.find(
            (dep) => dep.name === currentDepartment
        );

        if (selectedDepartment) {
            if (selectedDepartment.id !== event.departmentId) {
                event.subdepartmentId = null;
                setCurrentSubdepartment("");
            }

            setEvent({ ...event, departmentId: selectedDepartment.id });
            setSubdepartments(selectedDepartment.Subdepartments);
        }
    }, [currentDepartment, departments, event]);

    useEffect(() => {
        const selectedSubdepartment = subdepartments.find(
            (subdep) => subdep.name === currentSubdepartment
        );

        if (selectedSubdepartment) {
            setEvent({ ...event, subdepartmentId: selectedSubdepartment.id });
        }
    }, [currentSubdepartment, subdepartments, event]);

    useEffect(() => {
        const selectedDirection = directions.find(
            (dir) => dir.name === currentDirection
        );

        if (selectedDirection) {
            if (selectedDirection.id !== event.directionId) {
                event.subdirectionId = null;
                setCurrentSubdirection("");
            }

            setEvent({ ...event, directionId: selectedDirection.id });
            setSubdirections(selectedDirection.Subdirections);
        }
    }, [currentDirection, directions, event]);

    useEffect(() => {
        const selectedSubdirection = subdirections.find(
            (subdir) => subdir.name === currentSubdirection
        );

        if (selectedSubdirection) {
            setEvent({ ...event, subdirectionId: selectedSubdirection.id });
        }
    }, [currentSubdirection, subdirections, event]);

    const router = useNavigate();

    const submit = (e) => {
        e.preventDefault();
        creationHandler(event);

        router("/events");
    };

    const addEmployee = (employee) => {
        if (
            event.employees.find((emp) => emp.id === employee.id) === undefined
        ) {
            setEvent({
                ...event,
                employees: [...event.employees, employee],
            });
        }
    };

    const addStudent = (student) => {
        if (event.students.find((std) => std.id === student.id) === undefined) {
            setEvent({
                ...event,
                students: [...event.students, student],
            });
        }
    };

    const addParticipant = (participant) => {
        if (
            event.participants.find((prt) => prt.id === participant.id) ===
            undefined
        ) {
            setEvent({
                ...event,
                participants: [...event.participants, participant],
            });
        }
    };

    const removeEmployee = (id) => {
        setEvent({
            ...event,
            employees: event.employees.filter((emp) => emp.id !== id),
        });
    };

    const removeStudent = (id) => {
        setEvent({
            ...event,
            students: event.students.filter((std) => std.id !== id),
        });
    };

    const removeParticipant = (id) => {
        setEvent({
            ...event,
            participants: event.participants.filter((prt) => prt.id !== id),
        });
    };

    return (
        <>
            <OrganizersModal
                isOpen={organizersModalOpen}
                closeHandler={() => setOrganizersModalOpen(false)}
                currentEmployees={event.employees}
                addEmployeeHandler={addEmployee}
                removeEmployeeHandler={removeEmployee}
                currentStudents={event.students}
                addStudentHandler={addStudent}
                removeStudentHandler={removeStudent}
            />
            <ParticipantsModal
                isOpen={participantsModalOpen}
                closeHandler={() => setParticipantsModalOpen(false)}
                currentParticipants={event.participants}
                addParticipantHandler={addParticipant}
                removeParticipantHandler={removeParticipant}
            />
            <Container>
                <Grid
                    container
                    mt={2}
                    rowGap={2}
                    columnGap={2}
                    alignItems={"baseline"}
                >
                    <Grid item xs={3}>
                        <Typography variant="h5">
                            Создать мероприятие
                        </Typography>
                    </Grid>
                    <Grid item xs={5} container columnGap={2}>
                        <Grid item xs={5}>
                            <Button
                                variant="outlined"
                                fullWidth
                                style={{ padding: 10 }}
                                onClick={(e) => setOrganizersModalOpen(true)}
                            >
                                Организаторы
                            </Button>
                        </Grid>
                        <Grid item xs={5}>
                            <Button
                                variant="outlined"
                                fullWidth
                                style={{ padding: 10 }}
                                onClick={(e) => setParticipantsModalOpen(true)}
                            >
                                Участники
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item xs={5}>
                        <FormControl fullWidth>
                            <InputLabel id="department-label">
                                Подразделение
                            </InputLabel>
                            <Select
                                fullWidth
                                labelId="department-label"
                                id="department-select"
                                value={currentDepartment}
                                label="Подразделение"
                                onChange={(e) =>
                                    setCurrentDepartment(e.target.value)
                                }
                            >
                                {departments.map((dep) => (
                                    <MenuItem key={dep.id} value={dep.name}>
                                        {dep.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={5}>
                        {subdepartments.length > 0 ? (
                            <FormControl fullWidth>
                                <InputLabel id="subdepartment-label">
                                    Факультет
                                </InputLabel>
                                <Select
                                    fullWidth
                                    labelId="subdepartment-label"
                                    id="subdepartment-select"
                                    value={currentSubdepartment}
                                    label="Факультет"
                                    onChange={(e) =>
                                        setCurrentSubdepartment(e.target.value)
                                    }
                                >
                                    {subdepartments.map((subdep) => (
                                        <MenuItem
                                            key={subdep.id}
                                            value={subdep.name}
                                        >
                                            {subdep.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        ) : (
                            <></>
                        )}
                    </Grid>
                    <Grid item xs={5}>
                        <FormControl fullWidth>
                            <InputLabel id="direction-label">
                                Направление
                            </InputLabel>
                            <Select
                                fullWidth
                                labelId="direction-label"
                                id="direction-select"
                                value={currentDirection}
                                label="Направление"
                                onChange={(e) =>
                                    setCurrentDirection(e.target.value)
                                }
                            >
                                {directions.map((dir) => (
                                    <MenuItem key={dir.id} value={dir.name}>
                                        {dir.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={5}>
                        {subdirections.length > 0 ? (
                            <FormControl fullWidth>
                                <InputLabel id="subdirection-label">
                                    Тема
                                </InputLabel>
                                <Select
                                    fullWidth
                                    labelId="subdirection-label"
                                    id="subdirection-select"
                                    value={currentSubdirection}
                                    label="Тема"
                                    onChange={(e) =>
                                        setCurrentSubdirection(e.target.value)
                                    }
                                >
                                    {subdirections.map((subdir) => (
                                        <MenuItem
                                            key={subdir.id}
                                            value={subdir.name}
                                        >
                                            {subdir.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        ) : (
                            <></>
                        )}
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Название мероприятия"
                            required
                            value={event.name}
                            onChange={(e) =>
                                setEvent({ ...event, name: e.target.value })
                            }
                        ></TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            multiline
                            minRows={3}
                            label="Описание мероприятия"
                            value={event.description}
                            onChange={(e) =>
                                setEvent({
                                    ...event,
                                    description: e.target.value,
                                })
                            }
                        ></TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            multiline
                            minRows={2}
                            label="Планируемый результат"
                            value={event.plannedResult}
                            onChange={(e) =>
                                setEvent({
                                    ...event,
                                    plannedResult: e.target.value,
                                })
                            }
                        ></TextField>
                    </Grid>
                    <Grid item xs={6} container columnGap={12}>
                        <Grid item xs={5}>
                            <DatePicker
                                label="Дата проведения"
                                value={
                                    event.date === ""
                                        ? null
                                        : moment(event.date)
                                }
                                onChange={(newDate) =>
                                    setEvent({
                                        ...event,
                                        date: moment(newDate).format(
                                            "YYYY-MM-DD"
                                        ),
                                    })
                                }
                            ></DatePicker>
                        </Grid>
                        <Grid item xs={5}>
                            <TimePicker
                                label="Время проведения"
                                value={
                                    event.time === ""
                                        ? null
                                        : moment(event.time, "HH:mm")
                                }
                                onChange={(newTime) =>
                                    setEvent({
                                        ...event,
                                        time: newTime.format("HH:mm"),
                                    })
                                }
                            ></TimePicker>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}></Grid>
                    <Grid item xs={6}>
                        <Button
                            fullWidth
                            variant="contained"
                            style={{ padding: 10 }}
                            onClick={submit}
                        >
                            Создать
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default CreateEventForm;
