import { Box, Button, TextField, Modal, Typography } from "@mui/material";
import React from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Textarea } from "@mui/joy";

function AddOffensiveModal({ show = false, hide }) {
    return (
        <Modal
            open={show}
            onClose={hide}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 900,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Typography
                    id="add-invitee-modal-title"
                    variant="h6"
                    component="h2"
                    gutterBottom
                >
                    Добавить правонарушение
                </Typography>
                <Box
                    display={"flex"}
                    flexDirection={"row"}
                >
                    <Box
                        display={"flex"}
                        flexDirection={"column"}
                        width={400}
                        sx={{ mr: 2 }}
                    >
                        <TextField
                            sx={{ mt: 2 }}
                            label="Фамилия"
                        // value={newInviteeLastName}
                        // onChange={e => setNewInviteeLastName(e.target.value)}
                        />
                        <TextField
                            sx={{ mt: 2 }}
                            label="Имя"
                        // value={newInviteeName}
                        // onChangeCapture={e => setNewInviteeName(e.target.value)}
                        />
                        <TextField
                            sx={{ mt: 2 }}
                            label="Отчество"
                        // value={newInviteeSurename}
                        // onChangeCapture={e => setNewSurename(e.target.value)}
                        />
                        <TextField
                            sx={{ mt: 2 }}
                            label="Группа"
                        // value={newInviteeOrganization}
                        // onChange={e => setNewInviteeOrganization(e.target.value)}
                        />
                    </Box>
                    <Box
                        display={'flex'}
                        flexDirection={'column'}
                        width={400}
                    >
                        <TextField
                            sx={{ mt: 2 }}
                            label="Статья"
                        // value={newInviteePosition}
                        // onChangeCapture={e => setNewInviteePosition(e.target.value)}
                        />
                        <Textarea
                            size="lg"
                            placeholder="Решение суда"
                            sx={{ mt: 2}}
                        // value={newInviteePosition}
                        // onChangeCapture={e => setNewInviteePosition(e.target.value)}
                        />
                        <Box
                            display={"flex"}
                            flexDirection={"row"}
                        >
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    sx={{ mt: 2, mr: 2 }}
                                    label="Дата совершения"
                                />
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    sx={{ mt: 2 }}
                                    label="Дата решения суда"
                                />
                            </LocalizationProvider>
                        </Box>
                    </Box>
                </Box>
                <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                >
                    <Button
                        sx={{ mt: 2 }}
                        variant="outlined"
                        color="success"
                    >
                        Добавить
                    </Button>
                    <Button
                        sx={{ mt: 2 }}
                        variant="outlined"
                        color="error"
                    >
                        Отмена
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default AddOffensiveModal