import React from "react";
import CreateOffenseForm from "../components/CreateOffenseForm";
import { postOffense } from "../api/offensesApi";

const AddOffensivePage = () => {
    const createOffense = async (offense) => {
        const response = await postOffense(offense);
        if (response) {
            if (response.status < 300) {
                return true;
            } else {
                console.log("Error while creating the offense. Code: " + response.status);
            }
        } else {
            console.log("Server did not respond.");
        }

        return false;
    };

    return (
        <CreateOffenseForm creationHandler={createOffense} />
        // TODO margin bottom.
    );
};

export default AddOffensivePage;
