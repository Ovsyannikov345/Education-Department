import React, { useState } from "react";
import {
    Grid,
    Container,
    MenuItem,
    Select,
    Stack,
    FormControl,
    InputLabel,
    TextField,
    Button,
    Typography,
} from "@mui/material";
import ParticipantItem from "./ParticipantItem";

const ParticipantList = ({
    participants,
    availableParticipants,
    addParticipantHandler,
    createParticipantHandler,
    removeParticipantHandler,
    deleteParticipantHandler,
    readonly = false,
}) => {
    const [creationToggle, setCreationToggle] = useState(false);
    const [createdParticipant, setCreatedParticipant] = useState({
        lastName: "",
        firstName: "",
        patronymic: "",
        organization: "",
        position: "",
    });

    const createParticipant = () => {
        createParticipantHandler(createdParticipant);
        setCreationToggle(false);
        setCreatedParticipant({
            lastName: "",
            firstName: "",
            patronymic: "",
            organization: "",
            position: "",
        });
    };

    const cancelCreation = () => {
        setCreationToggle(false);
    };

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
                            Добавить участника
                        </InputLabel>
                        <Select
                            fullWidth
                            labelId="participant-label"
                            id="participant-select"
                            label="Добавить участника"
                            value={""}
                        >
                            {availableParticipants.length > 0 ? (
                                availableParticipants.map((prt) => (
                                    <MenuItem
                                        key={prt.id}
                                        value={`${prt.lastName} ${prt.firstName} ${prt.patronymic} ${prt.organization} ${prt.position}`}
                                        onClick={(e) =>
                                            addParticipantHandler(
                                                e.target.innerText
                                            )
                                        }
                                    >
                                        {`${prt.lastName} ${prt.firstName} ${prt.patronymic} ${prt.organization} ${prt.position}`}
                                    </MenuItem>
                                ))
                            ) : (
                                <MenuItem key={1}>
                                    Нет доступных участников
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    <Container
                        style={{ padding: 0, justifyContent: "flex-start" }}
                    >
                        {creationToggle ? (
                            <FormControl fullWidth>
                                <Typography variant="h6">
                                    Новый участник
                                </Typography>
                                <Grid container gap={1}>
                                    <Grid item xs={4}>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            label="Фамилия"
                                            value={createdParticipant.lastName}
                                            onChange={(e) =>
                                                setCreatedParticipant({
                                                    ...createdParticipant,
                                                    lastName: e.target.value,
                                                })
                                            }
                                        ></TextField>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            label="Имя"
                                            value={createdParticipant.firstName}
                                            onChange={(e) =>
                                                setCreatedParticipant({
                                                    ...createdParticipant,
                                                    firstName: e.target.value,
                                                })
                                            }
                                        ></TextField>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            label="Отчество"
                                            value={
                                                createdParticipant.patronymic
                                            }
                                            onChange={(e) =>
                                                setCreatedParticipant({
                                                    ...createdParticipant,
                                                    patronymic: e.target.value,
                                                })
                                            }
                                        ></TextField>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            label="Организация"
                                            value={
                                                createdParticipant.organization
                                            }
                                            onChange={(e) =>
                                                setCreatedParticipant({
                                                    ...createdParticipant,
                                                    organization:
                                                        e.target.value,
                                                })
                                            }
                                        ></TextField>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            label="Должность"
                                            value={createdParticipant.position}
                                            onChange={(e) =>
                                                setCreatedParticipant({
                                                    ...createdParticipant,
                                                    position: e.target.value,
                                                })
                                            }
                                        ></TextField>
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                    marginTop={2}
                                    marginBottom={2}
                                    gap={2}
                                >
                                    <Grid item xs={2}>
                                        <Button
                                            fullWidth
                                            variant="outlined"
                                            color="primary"
                                            onClick={createParticipant}
                                        >
                                            Создать
                                        </Button>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Button
                                            fullWidth
                                            variant="outlined"
                                            color="error"
                                            onClick={cancelCreation}
                                        >
                                            Отмена
                                        </Button>
                                    </Grid>
                                </Grid>
                            </FormControl>
                        ) : (
                            <Grid container marginTop={2} marginBottom={2}>
                                <Grid item xs>
                                    <Button
                                        variant="outlined"
                                        onClick={() => setCreationToggle(true)}
                                    >
                                        Новый участник
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
