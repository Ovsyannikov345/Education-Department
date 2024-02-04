import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    Typography,
    IconButton,
    Button,
    Container,
    TextField,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Tabs,
    Tab,
    Snackbar,
    Alert,
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import BackIcon from "@mui/icons-material/ArrowBackIos";
import { getEvent, putEvent } from "../api/eventsApi";
import { getDepartments } from "../api/departmentsApi";
import { getDirections } from "../api/directionsApi";
import { getStudents, postStudent, deleteStudent } from "../api/studentsApi";
import { getEmployees, postEmployee, deleteEmployee } from "../api/employeeApi";
import { getParticipants, postParticipant, deleteParticipant } from "../api/participantApi";
import moment from "moment";
import StudentList from "../modal/OrganizersModal/StudentList";
import EmployeeList from "../modal/OrganizersModal/EmployeeList";
import ParticipantList from "../modal/ParticipantsModal/ParticipantList";

const EventDetailsPage = (props) => {
    const [event, setEvent] = useState({
        id: null,
        name: "",
        description: "",
        plannedResult: "",
        date: "",
        time: "",
        Department: {
            name: "",
        },
        Subdepartment: null,
        Direction: {
            name: "",
        },
        Subdirection: null,
        Employees: [],
        Students: [],
        Participants: [],
    });

    const [loadedEvent, setLoadedEvent] = useState({});
    const [loadedDepartments, setLoadedDepartments] = useState([]);
    const [loadedDirections, setLoadedDirections] = useState([]);
    const [loadedStudents, setLoadedStudents] = useState([]);
    const [loadedEmployees, setLoadedEmployees] = useState([]);
    const [loadedParticipants, setLoadedParticipants] = useState([]);

    const [currentTabIndex, setCurrentTabIndex] = useState(0);

    const [editModeToggle, setEditModeToggle] = useState(false);

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

    const availableSubdepartments = useMemo(() => {
        const department = loadedDepartments.find((dep) => dep.id === event.Department.id);

        return department !== undefined ? department.Subdepartments : [];
    }, [loadedDepartments, event.Department.id]);

    const availableSubdirections = useMemo(() => {
        const direction = loadedDirections.find((dir) => dir.id === event.Direction.id);

        return direction !== undefined ? direction.Subdirections : [];
    }, [loadedDirections, event.Direction.id]);

    const availableStudents = useMemo(() => {
        return loadedStudents.filter((std) => !event.Students.some((s) => s.id === std.id));
    }, [loadedStudents, event.Students]);

    const availableEmployees = useMemo(() => {
        return loadedEmployees.filter((emp) => !event.Employees.some((e) => e.id === emp.id));
    }, [loadedEmployees, event.Employees]);

    const availableParticipants = useMemo(() => {
        return loadedParticipants.filter((prt) => !event.Participants.some((p) => p.id === prt.id));
    }, [loadedParticipants, event.Participants]);

    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        const loadEvent = async () => {
            const response = await getEvent(id);

            if (!response.status || response.status >= 300) {
                displayError(response.data.error);
                return;
            }

            const loadedEvent = response.data;

            const formattedDate = moment.utc(loadedEvent.date).format("YYYY-MM-DD");
            const formattedTime = moment.utc(loadedEvent.date).format("HH:mm");

            setEvent({
                ...loadedEvent,
                date: formattedDate,
                time: formattedTime,
            });

            setLoadedEvent({
                ...loadedEvent,
                date: formattedDate,
                time: formattedTime,
            });
        };

        const loadDepartments = async () => {
            const response = await getDepartments();

            if (!response.status || response.status >= 300) {
                displayError(response.data.error);
                return;
            }

            setLoadedDepartments(response.data);
        };

        const loadDirections = async () => {
            const response = await getDirections();

            if (!response.status || response.status >= 300) {
                displayError(response.data.error);
                return;
            }

            setLoadedDirections(response.data);
        };

        const loadStudents = async () => {
            const response = await getStudents();

            if (!response.status || response.status >= 300) {
                displayError(response.data.error);
                return;
            }

            setLoadedStudents(response.data);
        };

        const loadEmployees = async () => {
            const response = await getEmployees();

            if (!response.status || response.status >= 300) {
                displayError(response.data.error);
                return;
            }

            setLoadedEmployees(response.data);
        };

        const loadParticipants = async () => {
            const response = await getParticipants();

            if (!response.status || response.status >= 300) {
                displayError(response.data.error);
                return;
            }

            setLoadedParticipants(response.data);
        };

        const loadData = async () => {
            await loadEvent();
            await loadDepartments();
            await loadDirections();
            await loadStudents();
            await loadEmployees();
            await loadParticipants();
        };

        loadData();
    }, [id]);

    const changeTab = (e, tabIndex) => {
        setCurrentTabIndex(tabIndex);
    };

    const createStudent = async (createdStudent) => {
        const response = await postStudent(createdStudent);

        if (!response.status || response.status >= 300) {
            displayError(response.data.error);
            return;
        }

        const student = response.data;

        setEvent({
            ...event,
            Students: [...event.Students, student],
        });
        setLoadedStudents([...loadedStudents, student]);
        displaySuccess("Студент создан");
    };

    const addStudent = (studentString) => {
        const data = studentString.split(" ");
        const studentToAdd = availableStudents.find(
            (std) =>
                std.groupName === data[0] &&
                std.lastName === data[1] &&
                std.firstName === data[2] &&
                std.patronymic === data[3]
        );

        setEvent({
            ...event,
            Students: [...event.Students, studentToAdd],
        });
    };

    const removeStudent = (id) => {
        setEvent({
            ...event,
            Students: event.Students.filter((std) => std.id !== id),
        });
    };

    const removeStudentPermanent = async (id) => {
        const response = await deleteStudent(id);

        if (!response.status || response.status >= 300) {
            displayError(response.data.error);
            return;
        }

        removeStudent(id);
        setLoadedStudents(loadedStudents.filter((std) => std.id !== id));
        displaySuccess("Студент удален");
    };

    const createEmployee = async (createdEmployee) => {
        const response = await postEmployee(createdEmployee);

        if (!response.status || response.status >= 300) {
            displayError(response.data.error);
            return;
        }

        setEvent({
            ...event,
            Employees: [...event.Employees, response.data],
        });
        setLoadedEmployees([...loadedEmployees, response.data]);
        displaySuccess("Сотрудник создан");
    };

    const addEmployee = (employeeString) => {
        const data = employeeString.split(" ");
        const employeeToAdd = availableEmployees.find(
            (emp) => emp.lastName === data[0] && emp.firstName === data[1] && emp.patronymic === data[2]
        );

        setEvent({
            ...event,
            Employees: [...event.Employees, employeeToAdd],
        });
    };

    const removeEmployee = (id) => {
        setEvent({
            ...event,
            Employees: event.Employees.filter((emp) => emp.id !== id),
        });
    };

    const removeEmployeePermanent = async (id) => {
        const response = await deleteEmployee(id);

        if (!response.status || response.status >= 300) {
            displayError(response.data.error);
            return;
        }

        removeEmployee(id);
        setLoadedEmployees(loadedEmployees.filter((emp) => emp.id !== id));
        displaySuccess("Сотрудник удален");
    };

    const createParticipant = async (createdParticipant) => {
        const response = await postParticipant(createdParticipant);

        if (!response.status || response.status >= 300) {
            displayError(response.data.error);
            return;
        }

        setEvent({
            ...event,
            Participants: [...event.Participants, response.data],
        });

        setLoadedParticipants([...loadedParticipants, response.data]);
        displaySuccess("Участник создан");
    };

    const addParticipant = (participantString) => {
        const data = participantString.split(" ");
        const participantToAdd = availableParticipants.find(
            (prt) =>
                prt.lastName === data[0] &&
                prt.firstName === data[1] &&
                prt.patronymic === data[2] &&
                prt.organization === data[3] &&
                prt.position === data[4]
        );

        setEvent({
            ...event,
            Participants: [...event.Participants, participantToAdd],
        });
    };

    const removeParticipant = (id) => {
        setEvent({
            ...event,
            Participants: event.Participants.filter((prt) => prt.id !== id),
        });
    };

    const removeParticipantPermanent = async (id) => {
        const response = await deleteParticipant(id);

        if (!response.status || response.status >= 300) {
            displayError(response.data.error);
            return;
        }

        removeParticipant(id);
        setLoadedParticipants(loadedParticipants.filter((prt) => prt.id !== id));
        displaySuccess("Участник удален");
    };

    const changeDepartment = (departmentName) => {
        const department = loadedDepartments.find((dep) => dep.name === departmentName);

        if (department.id !== event.Department.id) {
            setEvent({
                ...event,
                departmentId: department.id,
                Department: department,
                subdepartmentId: null,
                Subdepartment: null,
            });
        }
    };

    const changeSubdepartment = (subdepartmentName) => {
        const subdepartment = loadedDepartments
            .find((dep) => dep.id === event.Department.id)
            .Subdepartments.find((subdep) => subdep.name === subdepartmentName);

        setEvent({
            ...event,
            subdepartmentId: subdepartment.id,
            Subdepartment: subdepartment,
        });
    };

    const changeDirection = (directionName) => {
        const direction = loadedDirections.find((dir) => dir.name === directionName);

        if (direction.id !== event.Direction.id) {
            setEvent({
                ...event,
                directionId: direction.id,
                Direction: direction,
                subdirectionId: null,
                Subdirection: null,
            });
        }
    };

    const changeSubdirection = (subdirectionName) => {
        const subdirection = loadedDirections
            .find((dir) => dir.id === event.Direction.id)
            .Subdirections.find((subdir) => subdir.name === subdirectionName);

        setEvent({
            ...event,
            subdirectionId: subdirection.id,
            Subdirection: subdirection,
        });
    };

    const applyChanges = async () => {
        if (event.Subdepartment === null && availableSubdepartments.length > 0) {
            displayError("Выберите факультет");
            return;
        }

        if (event.Subdirection === null && availableSubdirections.length > 0) {
            displayError("Выберите тему");
            return;
        }

        const response = await putEvent({
            id: event.id,
            name: event.name,
            description: event.description,
            plannedResult: event.plannedResult,
            date: `${event.date}T${event.time}:00.000Z`,
            departmentId: event.Department.id,
            subdepartmentId: event.Subdepartment != null ? event.Subdepartment.id : null,
            directionId: event.Direction.id,
            subdirectionId: event.Subdirection != null ? event.Subdirection.id : null,
            employees: [...event.Employees],
            students: [...event.Students],
            participants: [...event.Participants],
        });

        if (!response.status || response.status >= 300) {
            displayError(response.data.error);
            return;
        }

        setLoadedEvent(event);
        setEditModeToggle(false);
        displaySuccess("Мероприятие изменено");
    };

    const declineChanges = () => {
        setEvent(loadedEvent);
        setEditModeToggle(false);
    };

    return (
        <>
            <IconButton
                color="primary"
                style={{ marginTop: 10, marginLeft: 10 }}
                onClick={() => navigate("/events")}
            >
                <BackIcon></BackIcon>Список мероприятий
            </IconButton>
            <Container>
                <Grid container alignItems={"center"}>
                    <Grid item xs={5}>
                        <Typography variant="h4">Детали мероприятия</Typography>
                    </Grid>
                    {!editModeToggle && (
                        <Grid item xs={2}>
                            <Button variant="outlined" onClick={() => setEditModeToggle(true)}>
                                Редактировать
                            </Button>
                        </Grid>
                    )}
                    {editModeToggle && (
                        <>
                            <Grid item xs={2}>
                                <Button variant="outlined" color="primary" onClick={() => applyChanges()}>
                                    Сохранить
                                </Button>
                            </Grid>
                            <Grid item xs={2}>
                                <Button variant="outlined" color="error" onClick={() => declineChanges()}>
                                    Отмена
                                </Button>
                            </Grid>
                        </>
                    )}
                </Grid>
                <Grid container gap={1} mt={3}>
                    <Grid item xs={6}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            label="Название мероприятия"
                            value={event.name}
                            InputProps={{ readOnly: !editModeToggle }}
                            onChange={(e) =>
                                setEvent({
                                    ...event,
                                    name: e.target.value,
                                })
                            }
                        />
                    </Grid>
                    <Grid item xs={2.5}>
                        <DatePicker
                            label="Дата"
                            readOnly={!editModeToggle}
                            value={event.date === "" ? null : moment.utc(event.date, "YYYY-MM-DD")}
                            onChange={(newDate) =>
                                newDate === null
                                    ? setEvent({ ...event, date: "" })
                                    : setEvent({
                                          ...event,
                                          date: moment(newDate).format("YYYY-MM-DD"),
                                      })
                            }
                        ></DatePicker>
                    </Grid>
                    <Grid item xs={2.4}>
                        <TimePicker
                            label="Время"
                            readOnly={!editModeToggle}
                            value={event.time === "" ? null : moment(event.time, "HH:mm")}
                            onChange={(newTime) =>
                                newTime === null
                                    ? setEvent({ ...event, time: "" })
                                    : setEvent({
                                          ...event,
                                          time: newTime.format("HH:mm"),
                                      })
                            }
                        ></TimePicker>
                    </Grid>
                    <Grid item xs={5.5}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            multiline
                            minRows={3}
                            label="Описание мероприятия"
                            value={event.description}
                            InputProps={{ readOnly: !editModeToggle }}
                            onChange={(e) =>
                                setEvent({
                                    ...event,
                                    description: e.target.value,
                                })
                            }
                        />
                    </Grid>
                    <Grid item xs={5.5}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            multiline
                            minRows={3}
                            label="Планируемый результат"
                            value={event.plannedResult}
                            InputProps={{ readOnly: !editModeToggle }}
                            onChange={(e) =>
                                setEvent({
                                    ...event,
                                    plannedResult: e.target.value,
                                })
                            }
                        />
                    </Grid>
                    <Grid item xs={5.5}>
                        <FormControl fullWidth>
                            <InputLabel id="department-label">Подразделение</InputLabel>
                            <Select
                                fullWidth
                                labelId="department-label"
                                id="department-select"
                                value={loadedDepartments.length > 0 ? event.Department.name : ""}
                                label="Подразделение"
                                readOnly={!editModeToggle}
                                onChange={(e) => changeDepartment(e.target.value)}
                            >
                                {loadedDepartments.map((dep) => (
                                    <MenuItem key={dep.id} value={dep.name}>
                                        {dep.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={5.5}>
                        {availableSubdepartments.length > 0 ? (
                            <FormControl fullWidth>
                                <InputLabel id="subdepartment-label">Факультет</InputLabel>
                                <Select
                                    fullWidth
                                    labelId="subdepartment-label"
                                    id="subdepartment-select"
                                    value={event.Subdepartment === null ? "" : event.Subdepartment.name}
                                    label="Факультет"
                                    readOnly={!editModeToggle}
                                    onChange={(e) => changeSubdepartment(e.target.value)}
                                >
                                    {availableSubdepartments.map((subdep) => (
                                        <MenuItem key={subdep.id} value={subdep.name}>
                                            {subdep.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        ) : (
                            <></>
                        )}
                    </Grid>
                    <Grid item xs={5.5}>
                        <FormControl fullWidth>
                            <InputLabel id="direction-label">Направление</InputLabel>
                            <Select
                                fullWidth
                                labelId="direction-label"
                                id="direction-select"
                                value={loadedDirections.length > 0 ? event.Direction.name : ""}
                                label="Направление"
                                readOnly={!editModeToggle}
                                onChange={(e) => changeDirection(e.target.value)}
                            >
                                {loadedDirections.map((dir) => (
                                    <MenuItem key={dir.id} value={dir.name}>
                                        {dir.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={5.5}>
                        {availableSubdirections.length > 0 ? (
                            <FormControl fullWidth>
                                <InputLabel id="subdirection-label">Тема</InputLabel>
                                <Select
                                    fullWidth
                                    labelId="subdirection-label"
                                    id="subdirection-select"
                                    value={event.Subdirection === null ? "" : event.Subdirection.name}
                                    label="Тема"
                                    readOnly={!editModeToggle}
                                    onChange={(e) => changeSubdirection(e.target.value)}
                                >
                                    {availableSubdirections.map((subdir) => (
                                        <MenuItem key={subdir.id} value={subdir.name}>
                                            {subdir.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        ) : (
                            <></>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <Tabs centered value={currentTabIndex} onChange={changeTab}>
                            <Tab label="Сотрудники" />
                            <Tab label="Студенты" />
                            <Tab label="Участники" />
                        </Tabs>
                    </Grid>
                    <Grid item xs={10}>
                        {currentTabIndex === 0 && (
                            <EmployeeList
                                employees={event.Employees}
                                availableEmployees={availableEmployees}
                                addEmployeeHandler={addEmployee}
                                createEmployeeHandler={createEmployee}
                                removeEmployeeHandler={removeEmployee}
                                deleteEmployeeHandler={removeEmployeePermanent}
                                readonly={!editModeToggle}
                            />
                        )}
                        {currentTabIndex === 1 && (
                            <StudentList
                                students={event.Students}
                                availableStudents={availableStudents}
                                addStudentHandler={addStudent}
                                createStudentHandler={createStudent}
                                removeStudentHandler={removeStudent}
                                deleteStudentHandler={removeStudentPermanent}
                                readonly={!editModeToggle}
                            />
                        )}
                        {currentTabIndex === 2 && (
                            <ParticipantList
                                participants={event.Participants}
                                availableParticipants={availableParticipants}
                                addParticipantHandler={addParticipant}
                                createParticipantHandler={createParticipant}
                                removeParticipantHandler={removeParticipant}
                                deleteParticipantHandler={removeParticipantPermanent}
                                readonly={!editModeToggle}
                            />
                        )}
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

export default EventDetailsPage;
