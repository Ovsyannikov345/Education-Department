import React, { useEffect, useState } from "react";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";

const OffenseFilter = ({ queryHandler }) => {
    const [text, setText] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    useEffect(
        () =>
            queryHandler({
                text: text,
                startDate: startDate,
                endDate: endDate,
            }),
        [text, startDate, endDate, queryHandler]
    );

    const resetFilter = () => {
        setText("");
        setStartDate(null);
        setEndDate(null);
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
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                        <Grid container item xs={12} justifyContent={"space-between"}>
                            <Grid item xs={5}>
                                <DatePicker
                                    label="От"
                                    value={startDate != null ? moment(startDate) : null}
                                    maxDate={endDate != null ? moment(endDate) : null}
                                    onChange={(newDate) => setStartDate(moment(newDate).format("YYYY-MM-DD"))}
                                />
                            </Grid>
                            <Grid container item justifyContent={"center"} alignItems={"center"} xs={2}>
                                <div style={{ width: "30%", height: "2px", backgroundColor: "black" }}></div>
                            </Grid>
                            <Grid item xs={5}>
                                <DatePicker
                                    label="До"
                                    value={endDate != null ? moment(endDate) : null}
                                    minDate={startDate != null ? moment(startDate) : null}
                                    onChange={(newDate) => setEndDate(moment(newDate).format("YYYY-MM-DD"))}
                                />
                            </Grid>
                            {startDate != null && (
                                <Grid item xs={5}>
                                    <Button variant="text" onClick={() => setStartDate(null)}>
                                        Сброс
                                    </Button>
                                </Grid>
                            )}
                            {endDate != null && <Grid item xs={2} />}
                            {endDate != null && (
                                <Grid item xs={5}>
                                    <Button variant="text" onClick={() => setEndDate(null)}>
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
