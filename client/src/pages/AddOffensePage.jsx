import React from "react";
import CreateOffenseForm from "../components/CreateOffenseForm";
import { postOffense } from "../api/offensesApi";

const AddOffensePage = () => {
    const createOffense = async (offense) => {
        const response = await postOffense(offense);

        if (!response.status || response.status >= 300) {
            return response.data.error;
        }

        return "";
    };

    return <CreateOffenseForm creationHandler={createOffense} />;
};

export default AddOffensePage;
