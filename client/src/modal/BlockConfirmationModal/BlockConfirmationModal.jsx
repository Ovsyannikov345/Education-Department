import React from "react";
import { Dialog, Typography, Grid, Button, Container } from "@mui/material";

const BlockConfirmationModal = ({ isOpen, acceptHandler, declineHandler }) => {
    const closeModal = () => {
        declineHandler();
    };

    return (
        <Dialog open={isOpen} onClose={closeModal}>
            <Typography variant="h5" paddingLeft={3} paddingRight={3} marginTop={1} textAlign={"center"}>
                Заблокировать учетную запись?
            </Typography>
            <Container>
                <Grid container justifyContent={"space-between"} marginTop={2} marginBottom={2}>
                    <Grid item>
                        <Button variant="outlined" color="error" onClick={acceptHandler}>
                            Заблокировать
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" onClick={declineHandler}>
                            Отмена
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </Dialog>
    );
};

export default BlockConfirmationModal;
