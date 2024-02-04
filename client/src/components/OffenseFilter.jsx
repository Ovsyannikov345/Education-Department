import React, { useEffect, useState } from "react";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";

const OffenseFilter = ({ queryHandler, displaySuccess }) => {
    const [searchQuery, setSearchQuery] = useState(
        JSON.parse(localStorage.getItem("offenseSearchQuery")) ?? {
            text: "",
            startDate: null,
            endDate: null,
        }
    );

    useEffect(() => {
        const query = {
            ...searchQuery,
            startDate: searchQuery.startDate !== "Invalid date" ? searchQuery.startDate : null,
            endDate: searchQuery.endDate !== "Invalid date" ? searchQuery.endDate : null,
        };

        localStorage.setItem("offenseSearchQuery", JSON.stringify(query));

        queryHandler(searchQuery);
    }, [searchQuery, queryHandler]);

    const resetFilter = () => {
        setSearchQuery({
            text: "",
            startDate: null,
            endDate: null,
        });
        displaySuccess("Фильтр сброшен");
    };

    return (
        <Grid container justifyContent={"flex-end"} mt={12}>
            <Grid container item xs={11.5}>
                <Paper
                    style={{
                        maxWidth: "100%",
                        boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.5)",
                        borderRadius: "8px",
                    }}
                    elevation={3}
                >
                    <Grid container p={1} pb={2} rowGap={1}>
                        <Grid item xs={12}>
                            <Typography variant="h5" textAlign={"center"}>
                                Поиск и фильтрация
                            </Typography>
                        </Grid>
                        <TextField
                            label="Имя или группа"
                            fullWidth
                            autoComplete="off"
                            value={searchQuery.text}
                            onChange={(e) => setSearchQuery({ ...searchQuery, text: e.target.value })}
                        />
                        <Grid container item xs={12} justifyContent={"space-between"}>
                            <Grid item xs={5}>
                                <DatePicker
                                    label="От"
                                    value={searchQuery.startDate != null ? moment(searchQuery.startDate) : null}
                                    maxDate={searchQuery.endDate != null ? moment(searchQuery.endDate) : null}
                                    onChange={(newDate) =>
                                        setSearchQuery({
                                            ...searchQuery,
                                            startDate: moment(newDate).format("YYYY-MM-DD"),
                                        })
                                    }
                                />
                            </Grid>
                            <Grid container item justifyContent={"center"} alignItems={"center"} xs={2}>
                                <div style={{ width: "30%", height: "2px", backgroundColor: "black" }}></div>
                            </Grid>
                            <Grid item xs={5}>
                                <DatePicker
                                    label="До"
                                    value={searchQuery.endDate != null ? moment(searchQuery.endDate) : null}
                                    minDate={searchQuery.startDate != null ? moment(searchQuery.startDate) : null}
                                    onChange={(newDate) =>
                                        setSearchQuery({
                                            ...searchQuery,
                                            endDate: moment(newDate).format("YYYY-MM-DD"),
                                        })
                                    }
                                />
                            </Grid>
                            {searchQuery.startDate != null && (
                                <Grid item xs={5}>
                                    <Button
                                        variant="text"
                                        onClick={() =>
                                            setSearchQuery({
                                                ...searchQuery,
                                                startDate: null,
                                            })
                                        }
                                    >
                                        Сброс
                                    </Button>
                                </Grid>
                            )}
                            {searchQuery.endDate != null && <Grid item xs={2} />}
                            {searchQuery.endDate != null && (
                                <Grid item xs={5}>
                                    <Button
                                        variant="text"
                                        onClick={() =>
                                            setSearchQuery({
                                                ...searchQuery,
                                                endDate: null,
                                            })
                                        }
                                    >
                                        Сброс
                                    </Button>
                                </Grid>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <Button fullWidth variant="outlined" onClick={resetFilter}>
                                Сбросить все
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default OffenseFilter;
