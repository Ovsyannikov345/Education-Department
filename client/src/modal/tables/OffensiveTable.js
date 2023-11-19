import React from "react"
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Modal } from "@mui/material";
import { useContext } from "react";
import { Context } from '../../index'

function OffensiveTable({ show = false, hide }) {
    const { eventStore } = useContext(Context)

    const columns = [
        {
            field: 'full_name',
            headerName: 'Полное имя',
            width: 250,
            editable: true,
        },
        {
            field: 'article',
            headerName: 'Организация',
            width: 230,
            editable: true,
        },
        {
            field: 'penalty',
            headerName: 'Дата совершения',
            width: 230,
            editable: true,
        },
        {
            field: 'date_committed',
            headerName: 'Дата совершения',
            width: 230,
            editable: true,
        },
        {
            field: 'court_decision',
            headerName: 'Дата решения суда',
            width: 230,
            editable: true,
        }
    ];

    return (
        <>
            <Modal
                open={show}
                onClose={hide}
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', width: 1300, bgcolor: 'white' }}>
                    <Box sx={{ height: 600 }}>
                        <DataGrid
                            rows={eventStore.invites}
                            columns={columns}
                            disableSelectionOnClick
                            autoPageSize={true}
                            slots={{ toolbar: GridToolbar }}
                            slotProps={{
                                toolbar: {
                                    showQuickFilter: true,
                                },
                            }}
                            disableColumnFilter
                        />
                    </Box>
                </Box>
            </Modal>
        </>
    )
}

export default OffensiveTable