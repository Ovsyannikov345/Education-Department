import React from "react";
import { Box, Button, Modal } from "@mui/material";

function SelectOrgaiz({ show = false, hide }) {
    return (
        <Modal
            open={show}
            onClose={hide}
            sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
            <Box sx={{ display: "flex", flexDirection: "column", width: 500, bgcolor: "white" }}>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Button
                        sx={{ width: "300px", mt: 2 }}
                        // onClick={ }
                        variant="outlined"
                    >
                        Студенты организаторы
                    </Button>
                    <Button sx={{ width: "300px", mt: 2 }} variant="outlined">
                        Преподаватели организаторы
                    </Button>
                    <Button sx={{ width: "300px", mt: 2, mb: 2 }} variant="outlined">
                        СППС
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default SelectOrgaiz;
