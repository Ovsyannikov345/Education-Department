import React, { useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import CreatePersont from "../CreateInvitePirson";
import { useState } from "react";
import { Box, Modal, Button } from "@mui/material";
import { useContext } from "react";
import { Context } from "../../index";
// import { fatchAll } from "../../api/invitesApi";

function InvitePersonsTable({ show = false, hide }) {
    const { eventStore } = useContext(Context);

    const [addInviteeModal, setAddInviteeModel] = useState(false);
    const [refreshData, setRefreshData] = useState(false);

    const columns = [
        {
            field: "full_name",
            headerName: "Полное имя",
            width: 250,
            editable: true,
        },
        {
            field: "organization",
            headerName: "Организация",
            width: 230,
            editable: true,
        },
        {
            field: "position",
            headerName: "Должность",
            width: 230,
            editable: true,
        },
    ];

    useEffect(() => {
        // fatchAll().then(data => eventStore.setIvints(data))
    }, [eventStore, refreshData]);

    return (
        <>
            <Modal
                open={show}
                onClose={hide}
                sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
            >
                <Box sx={{ display: "flex", flexDirection: "column", width: 1000, bgcolor: "white" }}>
                    <Box sx={{ height: 600 }}>
                        <DataGrid
                            rows={eventStore.invites}
                            columns={columns}
                            disableSelectionOnClick
                            checkboxSelection
                            autoPageSize={true}
                            // onRowSelectionModelChange={(data) => {
                            //     // setSelectedRows(data)
                            // }}
                            slots={{ toolbar: GridToolbar }}
                            slotProps={{
                                toolbar: {
                                    showQuickFilter: true,
                                },
                            }}
                            disableColumnFilter
                        />
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Button
                            onClick={(e) => setAddInviteeModel(true)}
                            variant="contained"
                            sx={{ ml: 2, mr: 10 }}
                        >
                            Новый гость
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ mr: 2 }}
                            onClick={() => setRefreshData(!refreshData)}
                        >
                            Обновить
                        </Button>
                        <Button variant="contained" color="success" sx={{ mr: 2 }}>
                            Добавить
                        </Button>
                    </Box>
                </Box>
            </Modal>
            <CreatePersont
                show={addInviteeModal}
                hide={() => {
                    setAddInviteeModel(false);
                }}
            />
        </>
    );
}

export default InvitePersonsTable;
