import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Dialog, Typography, Container } from "@mui/material";
import { getParticipants, postParticipant, deleteParticipant } from "../../api/participantApi";
import ParticipantList from "./ParticipantList";

const ParticipantsModal = ({
    isOpen,
    closeHandler,
    currentParticipants,
    addParticipantHandler,
    removeParticipantHandler,
}) => {
    const [loadedParticipants, setLoadedParticipants] = useState([]);
    const [availableParticipants, setAvailableParticipants] = useState([]);

    const closeModal = () => {
        closeHandler();
    };

    const loadParticipants = async () => {
        const response = await getParticipants();

        if (response) {
            if (response.status < 300) {
                setLoadedParticipants(
                    response.data.sort((a, b) =>
                        [a.lastName, a.firstName, a.patronymic]
                            .join("")
                            .localeCompare([b.lastName, b.firstName, b.patronymic].join(""))
                    )
                );
            } else {
                console.log("Error while loading participants");
            }
        } else {
            console.log("Server did not respond");
        }
    };

    useEffect(() => {
        loadParticipants();
    }, []);

    useEffect(() => {
        setAvailableParticipants(loadedParticipants.filter((prt) => !currentParticipants.includes(prt)));
    }, [currentParticipants, loadedParticipants]);

    const createParticipant = async (createdParticipant) => {
        const response = await postParticipant(createdParticipant);

        if (response) {
            if (response.status < 300) {
                addParticipantHandler(response.data);
                setLoadedParticipants([...loadedParticipants, response.data]);
            } else {
                console.log("Error while creating the participant");
            }
        } else {
            console.log("Server did not respond");
        }
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

        addParticipantHandler(participantToAdd);
    };

    const removeParticipant = (id) => {
        removeParticipantHandler(id);
    };

    const removeParticipantPermanent = async (id) => {
        const response = await deleteParticipant(id);

        if (response) {
            if (response.status < 300) {
                removeParticipantHandler(id);
                setLoadedParticipants(loadedParticipants.filter((prt) => prt.id !== id));
            } else {
                console.log("Error while deleting the participant");
            }
        } else {
            console.log("Server did not respond");
        }
    };

    return (
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
