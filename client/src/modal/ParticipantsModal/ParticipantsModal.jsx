import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Dialog, Typography, Container, Snackbar, Alert } from "@mui/material";
import { getParticipants, postParticipant, deleteParticipant } from "../../api/participantApi";
import ParticipantList from "./ParticipantList";

const ParticipantsModal = ({ isOpen, closeHandler, currentParticipants, addParticipantHandler, removeParticipantHandler }) => {
    const [loadedParticipants, setLoadedParticipants] = useState([]);
    const [availableParticipants, setAvailableParticipants] = useState([]);

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
        const loadParticipants = async () => {
            const response = await getParticipants();

            if (!response.status || response.status >= 300) {
                displayError(response.data.error);
            }

            setLoadedParticipants(
                response.data.sort((a, b) =>
                    [a.lastName, a.firstName, a.patronymic].join("").localeCompare([b.lastName, b.firstName, b.patronymic].join(""))
                )
            );
        };

        loadParticipants();
    }, []);

    useEffect(() => {
        setAvailableParticipants(loadedParticipants.filter((prt) => !currentParticipants.includes(prt)));
    }, [currentParticipants, loadedParticipants]);

    const createParticipant = async (createdParticipant) => {
        const response = await postParticipant(createdParticipant);

        if (!response.status || response.status >= 300) {
            displayError(response.data.error);
        }

        setLoadedParticipants([...loadedParticipants, response.data]);
        addParticipantHandler(response.data);
        displaySuccess("Участник создан");
    };

    const addParticipant = (id) => {
        addParticipantHandler(availableParticipants.find((prt) => prt.id === id));
    };

    const removeParticipant = (id) => {
        removeParticipantHandler(id);
    };

    const removeParticipantPermanent = async (id) => {
        const response = await deleteParticipant(id);

        if (!response.status || response.status >= 300) {
            displayError(response.data.error);
        }

        removeParticipantHandler(id);
        setLoadedParticipants(loadedParticipants.filter((prt) => prt.id !== id));
        displaySuccess("Участник удален");
    };

    return (
        <>
            <Dialog fullWidth open={isOpen} onClose={closeModal}>
                <Typography variant="h5" paddingLeft={3} marginTop={1} textAlign={"center"}>
                    Участники мероприятия
                </Typography>
                <Container>
                    <ParticipantList
                        participants={currentParticipants}
                        availableParticipants={availableParticipants}
                        addParticipantHandler={addParticipant}
                        createParticipantHandler={createParticipant}
                        removeParticipantHandler={removeParticipant}
                        deleteParticipantHandler={removeParticipantPermanent}
                    />
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

ParticipantsModal.propTypes = {
    isOpen: PropTypes.bool,
    closeHandler: PropTypes.func,
    currentParticipants: PropTypes.array,
    addParticipantHandler: PropTypes.func,
    removeParticipantHandler: PropTypes.func,
};

export default ParticipantsModal;
