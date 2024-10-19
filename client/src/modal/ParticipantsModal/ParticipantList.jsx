import React, { useState, useMemo } from "react";
import { Grid, Container, MenuItem, Select, Stack, FormControl, InputLabel, TextField, Button, Typography } from "@mui/material";
import ParticipantItem from "./ParticipantItem";
import { useFormik } from "formik";
import validateParticipant from "./../../utils/validateFunctions/validateParticipant";

const ParticipantList = ({
    participants,
    availableParticipants,
    addParticipantHandler,
    createParticipantHandler,
    removeParticipantHandler,
    deleteParticipantHandler,
    readonly = false,
}) => {
    const formik = useFormik({
        initialValues: {
            lastName: "",
            firstName: "",
            patronymic: "",
            organization: "",
            position: "",
        },
        validate: validateParticipant,
        onSubmit: async (values) => {
            createParticipantHandler(values);
            setCreationToggle(false);
            formik.resetForm();
        },
    });

    const [creationToggle, setCreationToggle] = useState(false);

    useMemo(() => {
        participants.sort((a, b) =>
            [a.lastName, a.firstName, a.patronymic ?? "", a.organization, a.position ?? ""]
                .join("")
                .localeCompare([b.lastName, b.firstName, b.patronymic ?? "", b.organization, b.position ?? ""].join(""))
        );
    }, [participants]);

    useMemo(() => {
        availableParticipants.sort((a, b) =>
            [a.lastName, a.firstName, a.patronymic ?? "", a.organization, a.position ?? ""]
                .join("")
                .localeCompare([b.lastName, b.firstName, b.patronymic ?? "", b.organization, b.position ?? ""].join(""))
        );
    }, [availableParticipants]);

    return (
        <Stack gap={1} marginTop={1}>
            {participants !== undefined && participants.length > 0 ? (
                participants.map((prt) => (
                    <ParticipantItem
                        key={prt.id}
                        participant={prt}
                        removeHandler={removeParticipantHandler}
                        deleteHandler={deleteParticipantHandler}
                        readonly={readonly}
                    />
                ))
            ) : (
                <></>
            )}
            {!readonly && (
                <>
                    <FormControl fullWidth>
                        <InputLabel id="participant-label">
                            {availableParticipants.length > 0 ? "Добавить приглашенное дицо" : "Нет доступных лиц"}
                        </InputLabel>
                        <Select
                            fullWidth
                            labelId="participant-label"
                            id="participant-select"
                            label={availableParticipants.length > 0 ? "Добавить приглашенное дицо" : "Нет доступных лиц"}
                            readOnly={availableParticipants.length === 0}
                            value={""}
                            onChange={(e) => addParticipantHandler(e.target.value)}
                        >
                            {availableParticipants.length > 0 &&
                                availableParticipants.map((prt) => (
                                    <MenuItem key={prt.id} value={prt.id}>
                                        {`${prt.lastName}
                                        ${prt.firstName}
                                        ${prt.patronymic}
                                        ("${prt.organization}"${prt.position ? `, ${prt.position}` : ""})`}
                                    </MenuItem>
                                ))}
                        </Select>
                    </FormControl>
                    <Container style={{ padding: 0, justifyContent: "flex-start" }}>
                        {creationToggle ? (
                            <FormControl fullWidth>
                                <Typography variant="h6">Новое приглашенное лицо</Typography>
                                <Grid container spacing={1}>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            label="Фамилия"
                                            id="lastName"
                                            name="lastName"
                                            value={formik.values.lastName}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.lastName && formik.errors.lastName !== undefined}
                                            helperText={
                                                formik.touched.lastName && formik.errors.lastName !== undefined
                                                    ? formik.errors.lastName
                                                    : ""
                                            }
                                        ></TextField>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            label="Имя"
                                            id="firstName"
                                            name="firstName"
                                            value={formik.values.firstName}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.firstName && formik.errors.firstName !== undefined}
                                            helperText={
                                                formik.touched.firstName && formik.errors.firstName !== undefined
                                                    ? formik.errors.firstName
                                                    : ""
                                            }
                                        ></TextField>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            label="Отчество"
                                            id="patronymic"
                                            name="patronymic"
                                            value={formik.values.patronymic}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.patronymic && formik.errors.patronymic !== undefined}
                                            helperText={
                                                formik.touched.patronymic && formik.errors.patronymic !== undefined
                                                    ? formik.errors.patronymic
                                                    : ""
                                            }
                                        ></TextField>
                                    </Grid>
                                    <Grid item xs={6}></Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            label="Организация"
                                            id="organization"
                                            name="organization"
                                            value={formik.values.organization}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.organization && formik.errors.organization !== undefined}
                                            helperText={
                                                formik.touched.organization && formik.errors.organization !== undefined
                                                    ? formik.errors.organization
                                                    : ""
                                            }
                                        ></TextField>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            label="Должность"
                                            id="position"
                                            name="position"
                                            value={formik.values.position}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.position && formik.errors.position !== undefined}
                                            helperText={
                                                formik.touched.position && formik.errors.position !== undefined
                                                    ? formik.errors.position
                                                    : ""
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
                                            onClick={(e) => formik.handleSubmit()}
                                        >
                                            Создать
                                        </Button>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Button
                                            type="reset"
                                            fullWidth
                                            variant="outlined"
                                            color="error"
                                            onClick={(e) => {
                                                formik.handleReset(e);
                                                setCreationToggle(false);
                                            }}
                                        >
                                            Отмена
                                        </Button>
                                    </Grid>
                                </Grid>
                            </FormControl>
                        ) : (
                            <Grid container marginTop={2} marginBottom={2}>
                                <Grid item xs>
                                    <Button variant="outlined" onClick={() => setCreationToggle(true)}>
                                        Новое приглашенное лицо
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

export default ParticipantList;
