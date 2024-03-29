import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    Typography,
    IconButton,
    Button,
    Container,
    TextField,
    Grid,
    FormControl,
    FormHelperText,
    InputLabel,
    Select,
    MenuItem,
    Tabs,
    Tab,
    Snackbar,
    Alert,
    OutlinedInput,
    Box,
    Chip,
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
import { useFormik } from "formik";
import validateEvent from "../utils/validateFunctions/validateEvent";
import { createGroup, deleteGroup, getGroups } from "../api/groupApi";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import GroupCreationForm from "../components/GroupCreationForm";

const EventDetailsPage = (props) => {
    const { id } = useParams();

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            id: "",
            name: "",
            description: "",
            plannedResult: "",
            date: "",
            time: "",
            departmentId: "",
            subdepartmentId: "",
            directionId: "",
            subdirectionId: "",
            employees: [],
            students: [],
            groups: [],
            participants: [],
        },
        validate: (values) =>
            validateEvent(
                values,
                departments.find((dep) => dep.id === values.departmentId),
                directions.find((dir) => dir.id === values.directionId)
            ),
        onSubmit: async (values) => {
            const { time, ...event } = values;

            event.date = `${values.date}T${values.time}:00.000Z`;
            event.subdepartmentId = event.subdepartmentId || null;
            event.subdirectionId = event.subdirectionId || null;

            const response = await putEvent(event);

            if (!response.status || response.status >= 300) {
                displayError(response.data.error);
                return;
            }

            setInitialEvent(event);
            setEditModeToggle(false);
            displaySuccess("Мероприятие изменено");
        },
    });

    const [initialEvent, setInitialEvent] = useState(null);

    const [departments, setDepartments] = useState([]);
    const [availableSubdepartments, setAvailableSubdepartments] = useState([]);

    const [directions, setDirections] = useState([]);
    const [availableSubdirections, setAvailableSubdirections] = useState([]);

    const [students, setStudents] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [participants, setParticipants] = useState([]);
    const [availableGroups, setAvailableGroups] = useState([]);

    const [currentTabIndex, setCurrentTabIndex] = useState(0);

    const [editModeToggle, setEditModeToggle] = useState(false);
    const [groupCreationToggle, setGroupCreationToggle] = useState(false);

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

    useEffect(() => {
        const loadEvent = async () => {
            const response = await getEvent(id);

            if (!response.status || response.status >= 300) {
                displayError(response.data.error);
                return;
            }

            const loadedEvent = response.data;

            console.log(loadedEvent);

            const formattedDate = moment.utc(loadedEvent.date).format("YYYY-MM-DD");
            const formattedTime = moment.utc(loadedEvent.date).format("HH:mm");

            const event = {
                id: loadedEvent.id,
                name: loadedEvent.name,
                description: loadedEvent.description,
                plannedResult: loadedEvent.plannedResult,
                date: formattedDate,
                time: formattedTime,
                departmentId: loadedEvent.departmentId,
                subdepartmentId: loadedEvent.subdepartmentId || "",
                directionId: loadedEvent.directionId,
                subdirectionId: loadedEvent.subdirectionId || "",
                employees: loadedEvent.Employees,
                students: loadedEvent.Students,
                participants: loadedEvent.Participants,
                groups: loadedEvent.Groups.map((g) => g.id),
            };

            formik.setValues(event);
            setInitialEvent(event);

            setAvailableSubdepartments(loadedEvent.Department.Subdepartments);
            setAvailableSubdirections(loadedEvent.Direction.Subdirections);
        };

        const loadDepartments = async () => {
            const response = await getDepartments();

            if (!response.status || response.status >= 300) {
                displayError(response.data.error);
                return;
            }

            setDepartments(response.data);
        };

        const loadDirections = async () => {
            const response = await getDirections();

            if (!response.status || response.status >= 300) {
                displayError(response.data.error);
                return;
            }

            setDirections(response.data);
        };

        const loadStudents = async () => {
            const response = await getStudents();

            if (!response.status || response.status >= 300) {
                displayError(response.data.error);
                return;
            }

            setStudents(response.data);
        };

        const loadEmployees = async () => {
            const response = await getEmployees();

            if (!response.status || response.status >= 300) {
                displayError(response.data.error);
                return;
            }

            setEmployees(response.data);
        };

        const loadParticipants = async () => {
            const response = await getParticipants();

            if (!response.status || response.status >= 300) {
                displayError(response.data.error);
                return;
            }

            setParticipants(response.data);
        };

        const loadGroups = async () => {
            const response = await getGroups();

            if (!response.status || response.status >= 300) {
                displayError(response.data.error);
            }

            response.data.sort((a, b) => a.name.localeCompare(b.name));

            setAvailableGroups(response.data);
        };

        const loadData = async () => {
            await loadDepartments();
            await loadDirections();
            await loadStudents();
            await loadEmployees();
            await loadParticipants();
            await loadGroups();
            await loadEvent();
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

        formik.setFieldValue("students", [...formik.values.students, student]);
        setStudents([...students, student]);
        displaySuccess("Студент создан");
    };

    const addStudent = (id) => {
        formik.setFieldValue("students", [...formik.values.students, students.find((s) => s.id === id)]);
    };

    const removeStudent = (id) => {
        formik.setFieldValue(
            "students",
            formik.values.students.filter((std) => std.id !== id)
        );
    };

    const removeStudentPermanent = async (id) => {
        const response = await deleteStudent(id);

        if (!response.status || response.status >= 300) {
            displayError(response.data.error);
            return;
        }

        removeStudent(id);
        setStudents(students.filter((std) => std.id !== id));
        displaySuccess("Студент удален");
    };

    const createEmployee = async (createdEmployee) => {
        const response = await postEmployee(createdEmployee);

        if (!response.status || response.status >= 300) {
            displayError(response.data.error);
            return;
        }

        const employee = response.data;

        formik.setFieldValue("employees", [...formik.values.employees, employee]);
        setEmployees([...employees, employee]);
        displaySuccess("Сотрудник создан");
    };

    const addEmployee = (id) => {
        formik.setFieldValue("employees", [...formik.values.employees, employees.find((e) => e.id === id)]);
    };

    const removeEmployee = (id) => {
        formik.setFieldValue(
            "employees",
            formik.values.employees.filter((e) => e.id !== id)
        );
    };

    const removeEmployeePermanent = async (id) => {
        const response = await deleteEmployee(id);

        if (!response.status || response.status >= 300) {
            displayError(response.data.error);
            return;
        }

        removeEmployee(id);
        setEmployees(employees.filter((e) => e.id !== id));
        displaySuccess("Сотрудник удален");
    };

    const createParticipant = async (createdParticipant) => {
        const response = await postParticipant(createdParticipant);

        if (!response.status || response.status >= 300) {
            displayError(response.data.error);
            return;
        }

        const participant = response.data;

        formik.setFieldValue("participants", [...formik.values.participants, participant]);
        setParticipants([...participants, participant]);
        displaySuccess("Участник создан");
    };

    const addParticipant = (id) => {
        formik.setFieldValue("participants", [
            ...formik.values.participants,
            participants.find((p) => p.id === id),
        ]);
    };

    const removeParticipant = (id) => {
        formik.setFieldValue(
            "participants",
            formik.values.participants.filter((p) => p.id !== id)
        );
    };

    const removeParticipantPermanent = async (id) => {
        const response = await deleteParticipant(id);

        if (!response.status || response.status >= 300) {
            displayError(response.data.error);
            return;
        }

        removeParticipant(id);
        setParticipants(participants.filter((p) => p.id !== id));
        displaySuccess("Участник удален");
    };

    const removeGroup = async (id) => {
        const response = await deleteGroup(id);

        if (!response.status || response.status >= 300) {
            displayError(response.data.error);
            return;
        }

        formik.setFieldValue(
            "groups",
            formik.values.groups.filter((g) => g !== id)
        );
        setAvailableGroups(availableGroups.filter((g) => g.id !== id));
        displaySuccess("Группа удалена");
    };

    const createNewGroup = async (group) => {
        const response = await createGroup(group);

        if (!response.status || response.status >= 300) {
            displayError(response.data.error);
            return;
        }

        const createdGroup = response.data;

        displaySuccess("Группа создана и выбрана");
        setGroupCreationToggle(false);

        availableGroups.push(createdGroup);
        formik.setFieldValue("groups", [...formik.values.groups, createdGroup.id]);
    };

    const resetChanges = () => {
        formik.setValues(initialEvent);
        setAvailableSubdepartments(departments.find((d) => d.id === initialEvent.departmentId).Subdepartments);
        setAvailableSubdirections(directions.find((d) => d.id === initialEvent.directionId).Subdirections);
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
                <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
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
                                    <Button type="submit" variant="outlined" color="primary">
                                        Сохранить
                                    </Button>
                                </Grid>
                                <Grid item xs={2}>
                                    <Button variant="outlined" color="error" onClick={() => resetChanges()}>
                                        Отмена
                                    </Button>
                                </Grid>
                            </>
                        )}
                    </Grid>
                    <Grid container gap={1} mt={3}>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Название мероприятия"
                                id="name"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.name && formik.errors.name !== undefined}
                                helperText={
                                    formik.touched.name && formik.errors.name !== undefined
                                        ? formik.errors.name
                                        : ""
                                }
                                InputProps={{ readOnly: !editModeToggle }}
                            />
                        </Grid>
                        <Grid item xs={2.5}>
                            <DatePicker
                                label="Дата"
                                value={formik.values.date ? moment(formik.values.date) : null}
                                onChange={(newDate) =>
                                    formik.setFieldValue("date", moment(newDate).format("YYYY-MM-DD"), true)
                                }
                                onBlur={formik.handleBlur}
                                slotProps={{
                                    textField: {
                                        error: formik.touched.date && formik.errors.date !== undefined,
                                        helperText:
                                            formik.touched.date && formik.errors.date !== undefined
                                                ? formik.errors.date
                                                : "",
                                    },
                                }}
                                readOnly={!editModeToggle}
                            ></DatePicker>
                        </Grid>
                        <Grid item xs={2.4}>
                            <TimePicker
                                label="Время"
                                value={formik.values.time ? moment(formik.values.time, "HH:mm") : null}
                                onChange={(newTime) =>
                                    formik.setFieldValue("time", newTime.format("HH:mm"), true)
                                }
                                onBlur={formik.handleBlur}
                                slotProps={{
                                    textField: {
                                        error: formik.touched.time && formik.errors.time !== undefined,
                                        helperText:
                                            formik.touched.time && formik.errors.time !== undefined
                                                ? formik.errors.time
                                                : "",
                                    },
                                }}
                                readOnly={!editModeToggle}
                            ></TimePicker>
                        </Grid>
                        <Grid item xs={5.5}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                multiline
                                minRows={3}
                                label="Описание мероприятия"
                                id="description"
                                name="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.description && formik.errors.description !== undefined}
                                helperText={
                                    formik.touched.description && formik.errors.description !== undefined
                                        ? formik.errors.description
                                        : ""
                                }
                                InputProps={{ readOnly: !editModeToggle }}
                            />
                        </Grid>
                        <Grid item xs={5.5}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                multiline
                                minRows={3}
                                id="plannedResult"
                                name="plannedResult"
                                label="Планируемый результат"
                                value={formik.values.plannedResult}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.plannedResult && formik.errors.plannedResult !== undefined}
                                helperText={
                                    formik.touched.plannedResult && formik.errors.plannedResult !== undefined
                                        ? formik.errors.plannedResult
                                        : ""
                                }
                                InputProps={{ readOnly: !editModeToggle }}
                            />
                        </Grid>
                        <Grid item xs={5.5}>
                            <FormControl fullWidth>
                                <InputLabel
                                    id="department-label"
                                    error={
                                        formik.touched.departmentId && formik.errors.departmentId !== undefined
                                    }
                                >
                                    Структура
                                </InputLabel>
                                <Select
                                    fullWidth
                                    labelId="department-label"
                                    id="departmentId"
                                    name="departmentId"
                                    value={formik.values.departmentId}
                                    renderValue={(value) => departments.find((dep) => dep.id === value).name}
                                    label="Структура"
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                        formik.setFieldValue("subdepartmentId", "");
                                        formik.setFieldTouched("subdepartmentId", false);
                                        setAvailableSubdepartments(
                                            departments.find((dep) => dep.id === e.target.value).Subdepartments
                                        );
                                    }}
                                    onBlur={formik.handleBlur}
                                    error={
                                        formik.touched.departmentId && formik.errors.departmentId !== undefined
                                    }
                                    readOnly={!editModeToggle}
                                >
                                    {departments.map((dep) => (
                                        <MenuItem key={dep.id} value={dep.id}>
                                            {dep.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText error>
                                    {formik.touched.departmentId && formik.errors.departmentId !== undefined
                                        ? formik.errors.departmentId
                                        : ""}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={5.5}>
                            {availableSubdepartments.length > 0 ? (
                                <FormControl fullWidth>
                                    <InputLabel
                                        id="subdepartment-label"
                                        error={
                                            formik.touched.subdepartmentId &&
                                            formik.errors.subdepartmentId !== undefined
                                        }
                                    >
                                        Подразделение
                                    </InputLabel>
                                    <Select
                                        fullWidth
                                        labelId="subdepartment-label"
                                        id="subdepartmentId"
                                        name="subdepartmentId"
                                        value={formik.values.subdepartmentId}
                                        renderValue={(value) =>
                                            availableSubdepartments.find((subdep) => subdep.id === value).name
                                        }
                                        label="Подразделение"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={
                                            formik.touched.subdepartmentId &&
                                            formik.errors.subdepartmentId !== undefined
                                        }
                                        readOnly={!editModeToggle}
                                    >
                                        {availableSubdepartments.map((subdep) => (
                                            <MenuItem key={subdep.id} value={subdep.id}>
                                                {subdep.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText error>
                                        {formik.touched.subdepartmentId &&
                                        formik.errors.subdepartmentId !== undefined
                                            ? formik.errors.subdepartmentId
                                            : ""}
                                    </FormHelperText>
                                </FormControl>
                            ) : (
                                <></>
                            )}
                        </Grid>
                        <Grid item xs={5.5}>
                            <FormControl fullWidth>
                                <InputLabel
                                    id="direction-label"
                                    error={formik.touched.directionId && formik.errors.directionId !== undefined}
                                >
                                    Направление
                                </InputLabel>
                                <Select
                                    fullWidth
                                    labelId="direction-label"
                                    id="directionId"
                                    name="directionId"
                                    value={formik.values.directionId}
                                    renderValue={(value) => directions.find((dir) => dir.id === value).name}
                                    label="Направление"
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                        formik.setFieldValue("subdirectionId", "");
                                        formik.setFieldTouched("subdirectionId", false);
                                        setAvailableSubdirections(
                                            directions.find((dir) => dir.id === e.target.value).Subdirections
                                        );
                                    }}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.directionId && formik.errors.directionId !== undefined}
                                    readOnly={!editModeToggle}
                                >
                                    {directions.map((dir) => (
                                        <MenuItem key={dir.id} value={dir.id}>
                                            {dir.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText error>
                                    {formik.touched.directionId && formik.errors.directionId !== undefined
                                        ? formik.errors.directionId
                                        : ""}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={5.5}>
                            {availableSubdirections.length > 0 ? (
                                <FormControl fullWidth>
                                    <InputLabel
                                        id="subdirection-label"
                                        error={
                                            formik.touched.subdirectionId &&
                                            formik.errors.subdirectionId !== undefined
                                        }
                                    >
                                        Составляющая
                                    </InputLabel>
                                    <Select
                                        fullWidth
                                        labelId="subdirection-label"
                                        id="subdirectionId"
                                        name="subdirectionId"
                                        value={formik.values.subdirectionId}
                                        renderValue={(value) =>
                                            availableSubdirections.find((subdir) => subdir.id === value).name
                                        }
                                        label="Составляющая"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={
                                            formik.touched.subdirectionId &&
                                            formik.errors.subdirectionId !== undefined
                                        }
                                        readOnly={!editModeToggle}
                                    >
                                        {availableSubdirections.map((subdir) => (
                                            <MenuItem key={subdir.id} value={subdir.id}>
                                                {subdir.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText error>
                                        {formik.touched.subdirectionId &&
                                        formik.errors.subdirectionId !== undefined
                                            ? formik.errors.subdirectionId
                                            : ""}
                                    </FormHelperText>
                                </FormControl>
                            ) : (
                                <></>
                            )}
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id="groups-label">Участвующие группы</InputLabel>
                                <Select
                                    labelId="groups-label"
                                    id="groups-select"
                                    multiple
                                    value={formik.values.groups}
                                    onChange={(e) => {
                                        formik.setFieldValue("groups", e.target.value);
                                    }}
                                    input={<OutlinedInput id="select-multiple-chip" label="Участвующие группы" />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Chip
                                                    key={value}
                                                    label={availableGroups.find((g) => g.id === value).name}
                                                />
                                            ))}
                                        </Box>
                                    )}
                                    MenuProps={{
                                        PaperProps: {
                                            style: {
                                                maxHeight: 224,
                                                width: 250,
                                            },
                                        },
                                    }}
                                    readOnly={!editModeToggle}
                                >
                                    {availableGroups.map((group) => (
                                        <MenuItem
                                            key={group.id}
                                            value={group.id}
                                            style={{ justifyContent: "space-between" }}
                                        >
                                            {group.name}
                                            {!formik.values.groups.some((id) => id === group.id) && (
                                                <IconButton
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeGroup(group.id);
                                                    }}
                                                >
                                                    <DeleteIcon color="error" />
                                                </IconButton>
                                            )}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        {editModeToggle && (
                            <Grid item xs={6}>
                                {!groupCreationToggle ? (
                                    <Button variant="outlined" onClick={() => setGroupCreationToggle(true)}>
                                        Создать группу
                                    </Button>
                                ) : (
                                    <Grid container item xs={6} gap={"10px"}>
                                        <GroupCreationForm
                                            createCallback={createNewGroup}
                                            declineCallback={() => setGroupCreationToggle(false)}
                                            errorCallback={displayError}
                                        />
                                    </Grid>
                                )}
                            </Grid>
                        )}
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
                                    employees={formik.values.employees}
                                    availableEmployees={employees.filter(
                                        (e) => !formik.values.employees.some((ee) => ee.id === e.id)
                                    )}
                                    addEmployeeHandler={addEmployee}
                                    createEmployeeHandler={createEmployee}
                                    removeEmployeeHandler={removeEmployee}
                                    deleteEmployeeHandler={removeEmployeePermanent}
                                    readonly={!editModeToggle}
                                />
                            )}
                            {currentTabIndex === 1 && (
                                <StudentList
                                    students={formik.values.students}
                                    availableStudents={students.filter(
                                        (s) => !formik.values.students.some((ss) => ss.id === s.id)
                                    )}
                                    addStudentHandler={addStudent}
                                    createStudentHandler={createStudent}
                                    removeStudentHandler={removeStudent}
                                    deleteStudentHandler={removeStudentPermanent}
                                    readonly={!editModeToggle}
                                />
                            )}
                            {currentTabIndex === 2 && (
                                <ParticipantList
                                    participants={formik.values.participants}
                                    availableParticipants={participants.filter(
                                        (p) => !formik.values.participants.some((pp) => pp.id === p.id)
                                    )}
                                    addParticipantHandler={addParticipant}
                                    createParticipantHandler={createParticipant}
                                    removeParticipantHandler={removeParticipant}
                                    deleteParticipantHandler={removeParticipantPermanent}
                                    readonly={!editModeToggle}
                                />
                            )}
                        </Grid>
                    </Grid>
                </form>
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
