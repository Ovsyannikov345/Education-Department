import React, { useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import moment from "moment";
import BlockConfirmationModal from "../modal/BlockConfirmationModal/BlockConfirmationModal";
import UnblockConfirmationModal from "./../modal/UnblockConfirmationModal/UnblockConfirmationModal";
import EventIcon from "@mui/icons-material/Event";

const UserCard = ({ userData, blockHandler, unblockHandler, currentUserId }) => {
    const [blockModalOpen, setBlockModalOpen] = useState(false);
    const [unblockModalOpen, setUnblockModalOpen] = useState(false);

    return (
        <>
            <BlockConfirmationModal
                isOpen={blockModalOpen}
                acceptHandler={() => {
                    blockHandler(userData.id);
                    setBlockModalOpen(false);
                }}
                declineHandler={() => setBlockModalOpen(false)}
            />
            <UnblockConfirmationModal
                isOpen={unblockModalOpen}
                acceptHandler={() => {
                    unblockHandler(userData.id);
                    setUnblockModalOpen(false);
                }}
                declineHandler={() => setUnblockModalOpen(false)}
            />
            <Grid
                container
                rowGap={0.5}
                marginTop={2}
                padding={2}
                borderRadius={2}
                sx={{ border: 1, borderColor: "#1976d29F" }}
            >
                <Grid container item justifyContent={"space-between"}>
                    <Typography variant="h6">
                        {[userData.lastName, userData.firstName, userData.patronymic].join(" ") +
                            (parseInt(currentUserId) === userData.id ? " (Вы)" : "")}
                    </Typography>
                    {userData.blockedAt != null && <Typography variant="h6">Заблокирована</Typography>}
                </Grid>
                <Grid container item justifyContent={"space-between"}>
                    <Typography variant="h6">{userData.email}</Typography>
                    {userData.blockedAt != null && (
                        <Typography variant="h6">{moment(userData.blokedAt).format("DD-MM-YYYY")}</Typography>
                    )}
                </Grid>
                <Grid container mt={2}>
                    <Typography variant="h6">
                        {userData.role === "user" ? "Пользователь" : "Администратор"}
                    </Typography>
                </Grid>
                <Grid container alignItems={"center"} columnGap={"3px"}>
                    <EventIcon />
                    <Typography variant="h6">{moment(userData.createdAt).format("DD-MM-YYYY")}</Typography>
                </Grid>
                {parseInt(currentUserId) !== userData.id && (
                    <Grid container mt={2}>
                        {userData.blockedAt == null ? (
                            <Button
                                variant="outlined"
                                color="error"
                                style={{ height: "40px" }}
                                onClick={() => setBlockModalOpen(true)}
                            >
                                Заблокировать
                            </Button>
                        ) : (
                            <Button
                                variant="outlined"
                                style={{ height: "40px" }}
                                onClick={() => setUnblockModalOpen(true)}
                            >
                                Разблокировать
                            </Button>
                        )}
                    </Grid>
                )}
            </Grid>
        </>
    );
};

export default UserCard;
