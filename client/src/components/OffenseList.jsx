import React, { useEffect, useMemo, useState } from "react";
import { Grid, Pagination, Typography } from "@mui/material";
import { ITEMS_PER_PAGE } from "../utils/consts";
import OffenseItem from "./OffenseItem";

const OffenseList = ({ offenses, deleteHandler }) => {
    const [page, setPage] = useState(1);
    const [pageOffenses, setPageOffenses] = useState([]);

    const pagesCount = useMemo(() => {
        var count = Math.floor(offenses.length / ITEMS_PER_PAGE);

        if (offenses.length % ITEMS_PER_PAGE !== 0) {
            count++;
        }

        return count;
    }, [offenses]);

    useEffect(() => {
        setPageOffenses(offenses.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE));
    }, [offenses, page]);

    const changePage = (event, value) => {
        setPage(value);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            {pageOffenses.length > 0 ? (
                <Grid container rowGap={2}>
                    <Grid container item xs={12}>
                        {pageOffenses.map((offense) => (
                            <OffenseItem key={offense.id} offense={offense} deleteHandler={deleteHandler} />
                        ))}
                    </Grid>
                    <Grid container justifyContent="center">
                        <Pagination count={pagesCount} color="primary" shape="rounded" page={page} onChange={changePage}></Pagination>
                    </Grid>
                </Grid>
            ) : (
                <Typography variant="h4" mt={2}>
                    Правонарушения не найдены
                </Typography>
            )}
        </>
    );
};

export default OffenseList;
