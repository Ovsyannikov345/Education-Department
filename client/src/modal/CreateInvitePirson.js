import React from "react";
import { useState } from "react";
// import { createInvite } from "../api/invitesApi";
import { Typography, Box, Modal, TextField, Button } from "@mui/material";

function CreateInvitePirson({ show = false, hide }) {
    const [newInviteeName, setNewInviteeName] = useState("");
    const [newInviteeSurename, setNewSurename] = useState("");
    const [newInviteeLastName, setNewInviteeLastName] = useState("");
    const [newInviteePosition, setNewInviteePosition] = useState("");
    const [newInviteeOrganization, setNewInviteeOrganization] = useState("");

    const handleAddInvitee = () => {
        const invite = {
            full_name: `${newInviteeLastName} ${newInviteeName} ${newInviteeSurename}`,
            position: newInviteePosition,
            organization: newInviteeOrganization,
        };

        // createInvite(invite)
        //     .then((data) => {
        //         setNewInviteeName("");
        //         setNewInviteeLastName("");
        //         setNewInviteeOrganization("");
        //         setNewSurename("");
        //         setNewInviteePosition("");
        //         hide();
        //     });
    };

    return (
        <Modal
            open={show}
            onClose={hide}
            aria-labelledby="add-invitee-modal-title"
            aria-describedby="add-invitee-modal-description"
            sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Typography id="add-invitee-modal-title" variant="h6" component="h2" gutterBottom>
                    Добавить приглашенного
                </Typography>
                <TextField
                    sx={{ mt: 2 }}
                    label="Фамилия"
                    value={newInviteeLastName}
                    onChange={(e) => setNewInviteeLastName(e.target.value)}
                />
                <TextField
                    sx={{ mt: 2 }}
                    label="Имя"
                    value={newInviteeName}
                    onChangeCapture={(e) => setNewInviteeName(e.target.value)}
                />
                <TextField
                    sx={{ mt: 2 }}
                    label="Отчество"
                    value={newInviteeSurename}
                    onChangeCapture={(e) => setNewSurename(e.target.value)}
                />
                <TextField
                    sx={{ mt: 2 }}
                    label="Организация приглашенного"
                    value={newInviteeOrganization}
                    onChange={(e) => setNewInviteeOrganization(e.target.value)}
                />
                <TextField
                    sx={{ mt: 2 }}
                    label="Должность приглашенного"
                    value={newInviteePosition}
                    onChangeCapture={(e) => setNewInviteePosition(e.target.value)}
                />
                <Button sx={{ mt: 2 }} variant="outlined" onClick={handleAddInvitee}>
                    Добавить
                </Button>
            </Box>
        </Modal>
    );
}

export default CreateInvitePirson;
