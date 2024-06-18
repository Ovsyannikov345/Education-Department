import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MAINPAGE_ROUTE } from "../utils/consts";
import {
    Container,
    FormControl,
    FormHelperText,
    Grid,
    Typography,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Button,
    IconButton,
    Snackbar,
    Alert,
    OutlinedInput,
    Box,
    Chip,
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import BackIcon from "@mui/icons-material/ArrowBackIos";
import moment from "moment";
import { getDepartments } from "../api/departmentsApi";
import { getSubdirections } from "../api/subdirectionsApi";
import { getDirections } from "../api/directionsApi";
import OrganizersModal from "../modal/OrganizersModal/OrganizersModal";
import ParticipantsModal from "../modal/ParticipantsModal/ParticipantsModal";
import { useFormik } from "formik";
import validateEvent from "./../utils/validateFunctions/validateEvent";
import { createGroup, deleteGroup, getGroups } from "../api/groupApi";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import GroupCreationForm from "./GroupCreationForm";

const CreateEventForm = ({ creationHandler }) => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
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
            const errorMessage = await creationHandler({
                ...values,
                subdepartmentId: values.subdepartmentId || null,
                subdirectionId: values.subdirectionId || null,
                date: `${values.date}T${values.time}:00.000Z`,
            });

            if (errorMessage === "") {
                navigate(MAINPAGE_ROUTE);
            } else {
                displayError(errorMessage);
            }
        },
    });

    const [departments, setDepartments] = useState([]);
    const [subdepartments, setSubdepartments] = useState([]);
    const [directions, setDirections] = useState([]);
    const [subdirections, setSubdirections] = useState([]);
    const [availableGroups, setAvailableGroups] = useState([]);

    const [organizersModalOpen, setOrganizersModalOpen] = useState(false);
    const [participantsModalOpen, setParticipantsModalOpen] = useState(false);

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
        const loadDepartments = async () => {
            const response = await getDepartments();

            if (!response.status || response.status >= 300) {
                displayError(response.data.error);
            }

            setDepartments(response.data);
        };

        const loadDirections = async () => {
            const response = await getDirections();

            if (!response.status || response.status >= 300) {
                displayError(response.data.error);
            }

            setDirections(response.data);
        };

        const loadSubdirections = async () => {
            const response = await getSubdirections();

            if (!response.status || response.status >= 300) {
                displayError(response.data.error);
            }

            setSubdirections(response.data);
        };

        const loadGroups = async () => {
            const response = await getGroups();

            if (!response.status || response.status >= 300) {
                displayError(response.data.error);
            }

            response.data.sort((a, b) => a.name.localeCompare(b.name));

            setAvailableGroups(response.data);
        };

        loadDepartments().then(() => {
            loadDirections().then(() => {
                loadSubdirections().then(() => {
                    loadGroups();
                });
            });
        });
    }, []);

    const addEmployee = (employee) => {
        formik.setFieldValue("employees", [...formik.values.employees, employee]);
    };

    const addStudent = (student) => {
        formik.setFieldValue("students", [...formik.values.students, student]);
    };

    const addParticipant = (participant) => {
        formik.setFieldValue("participants", [...formik.values.participants, participant]);
    };

    const removeEmployee = (id) => {
        formik.setFieldValue(
            "employees",
            formik.values.employees.filter((emp) => emp.id !== id)
        );
    };

    const removeStudent = (id) => {
        formik.setFieldValue(
            "students",
            formik.values.students.filter((std) => std.id !== id)
        );
    };

    const removeParticipant = (id) => {
        formik.setFieldValue(
            "participants",
            formik.values.participants.filter((prt) => prt.id !== id)
        );
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
        formik.setFieldValue("groups", [...formik.values.groups, createdGroup]);
    };

    const removeGroup = async (id) => {
        const response = await deleteGroup(id);

        if (!response.status || response.status >= 300) {
            displayError(response.data.error);
            return;
        }

        formik.setFieldValue(
            "groups",
            formik.values.groups.filter((g) => g.id !== id)
        );
        setAvailableGroups(availableGroups.filter((g) => g.id !== id));
        displaySuccess("Группа удалена");
    };

    return (
        <>
            <OrganizersModal
                isOpen={organizersModalOpen}
                closeHandler={() => setOrganizersModalOpen(false)}
                currentEmployees={formik.values.employees}
                addEmployeeHandler={addEmployee}
                removeEmployeeHandler={removeEmployee}
                currentStudents={formik.values.students}
                addStudentHandler={addStudent}
                removeStudentHandler={removeStudent}
            />
            <ParticipantsModal
                isOpen={participantsModalOpen}
                closeHandler={() => setParticipantsModalOpen(false)}
                currentParticipants={formik.values.participants}
                addParticipantHandler={addParticipant}
                removeParticipantHandler={removeParticipant}
            />
            <IconButton color="primary" style={{ marginTop: 10, marginLeft: 10 }} onClick={() => navigate(MAINPAGE_ROUTE)}>
                <BackIcon></BackIcon>Список мероприятий
            </IconButton>
            <Container>
                <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
                    <Grid container mt={2} mb={3} rowGap={2} columnGap={2} alignItems={"baseline"}>
                        <Grid item xs={3}>
                            <Typography variant="h5">Создать мероприятие</Typography>
                        </Grid>
                        <Grid item xs={5} container columnGap={2}>
                            <Grid item xs={5}>
                                <Button variant="outlined" fullWidth style={{ padding: 10 }} onClick={(e) => setOrganizersModalOpen(true)}>
                                    Организаторы
                                </Button>
                            </Grid>
                            <Grid item xs={5}>
                                <Button variant="outlined" fullWidth style={{ padding: 10 }} onClick={(e) => setParticipantsModalOpen(true)}>
                                    Приглашенные
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid item xs={5}>
                            <FormControl fullWidth>
                                <InputLabel
                                    id="department-label"
                                    error={formik.touched.departmentId && formik.errors.departmentId !== undefined}
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
                                        setSubdepartments(departments.find((dep) => dep.id === e.target.value).Subdepartments);
                                    }}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.departmentId && formik.errors.departmentId !== undefined}
                                >
                                    {departments.map((dep) => (
                                        <MenuItem key={dep.id} value={dep.id}>
                                            {dep.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText error>
                                    {formik.touched.departmentId && formik.errors.departmentId !== undefined ? formik.errors.departmentId : ""}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={5}>
                            {subdepartments.length > 0 ? (
                                <FormControl fullWidth>
                                    <InputLabel
                                        id="subdepartment-label"
                                        error={formik.touched.subdepartmentId && formik.errors.subdepartmentId !== undefined}
                                    >
                                        Подразделение
                                    </InputLabel>
                                    <Select
                                        fullWidth
                                        labelId="subdepartment-label"
                                        id="subdepartmentId"
                                        name="subdepartmentId"
                                        value={formik.values.subdepartmentId}
                                        renderValue={(value) => subdepartments.find((subdep) => subdep.id === value).name}
                                        label="Подразделение"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.subdepartmentId && formik.errors.subdepartmentId !== undefined}
                                    >
                                        {subdepartments.map((subdep) => (
                                            <MenuItem key={subdep.id} value={subdep.id}>
                                                {subdep.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText error>
                                        {formik.touched.subdepartmentId && formik.errors.subdepartmentId !== undefined
                                            ? formik.errors.subdepartmentId
                                            : ""}
                                    </FormHelperText>
                                </FormControl>
                            ) : (
                                <></>
                            )}
                        </Grid>
                        <Grid item xs={5}>
                            <FormControl fullWidth>
                                <InputLabel id="direction-label" error={formik.touched.directionId && formik.errors.directionId !== undefined}>
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
                                    }}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.directionId && formik.errors.directionId !== undefined}
                                >
                                    {directions.map((dir) => (
                                        <MenuItem key={dir.id} value={dir.id}>
                                            {dir.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText error>
                                    {formik.touched.directionId && formik.errors.directionId !== undefined ? formik.errors.directionId : ""}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={5}>
                            {subdirections.length > 0 ? (
                                <FormControl fullWidth>
                                    <InputLabel
                                        id="subdirection-label"
                                        error={formik.touched.subdirectionId && formik.errors.subdirectionId !== undefined}
                                    >
                                        Составляющая
                                    </InputLabel>
                                    <Select
                                        fullWidth
                                        labelId="subdirection-label"
                                        id="subdirectionId"
                                        name="subdirectionId"
                                        value={formik.values.subdirectionId}
                                        renderValue={(value) => subdirections.find((subdir) => subdir.id === value).name}
                                        label="Составляющая"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.subdirectionId && formik.errors.subdirectionId !== undefined}
                                    >
                                        {subdirections.map((subdir) => (
                                            <MenuItem key={subdir.id} value={subdir.id}>
                                                {subdir.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText error>
                                        {formik.touched.subdirectionId && formik.errors.subdirectionId !== undefined
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
                                                <Chip key={value.id} label={value.name} />
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
                                >
                                    {availableGroups.map((group) => (
                                        <MenuItem key={group.id} value={group} style={{ justifyContent: "space-between" }}>
                                            {group.name}
                                            <IconButton
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    removeGroup(group.id);
                                                }}
                                            >
                                                <DeleteIcon color="error" />
                                            </IconButton>
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
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
                                helperText={formik.touched.name && formik.errors.name !== undefined ? formik.errors.name : ""}
                            ></TextField>
                        </Grid>
                        <Grid item xs={6}>
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
                                    formik.touched.description && formik.errors.description !== undefined ? formik.errors.description : ""
                                }
                            ></TextField>
                        </Grid>
                        <Grid item xs={6}>
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
                                    formik.touched.plannedResult && formik.errors.plannedResult !== undefined ? formik.errors.plannedResult : ""
                                }
                            ></TextField>
                        </Grid>
                        <Grid item xs={6} container columnGap={12}>
                            <Grid item xs={5}>
                                <DatePicker
                                    label="Дата проведения"
                                    value={formik.values.date ? moment(formik.values.date) : null}
                                    onChange={(newDate) => formik.setFieldValue("date", moment(newDate).format("YYYY-MM-DD"), true)}
                                    onBlur={formik.handleBlur}
                                    slotProps={{
                                        textField: {
                                            error: formik.touched.date && formik.errors.date !== undefined,
                                            helperText: formik.touched.date && formik.errors.date !== undefined ? formik.errors.date : "",
                                        },
                                    }}
                                ></DatePicker>
                            </Grid>
                            <Grid item xs={5}>
                                <TimePicker
                                    label="Время проведения"
                                    value={formik.values.time ? moment(formik.values.time, "HH:mm") : null}
                                    onChange={(newTime) => formik.setFieldValue("time", newTime.format("HH:mm"), true)}
                                    onBlur={formik.handleBlur}
                                    slotProps={{
                                        textField: {
                                            error: formik.touched.time && formik.errors.time !== undefined,
                                            helperText: formik.touched.time && formik.errors.time !== undefined ? formik.errors.time : "",
                                        },
                                    }}
                                ></TimePicker>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}></Grid>
                        <Grid item xs={6}>
                            <Button type="submit" fullWidth variant="contained" style={{ padding: 10 }}>
                                Создать
                            </Button>
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

export default CreateEventForm;
