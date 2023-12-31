import { host } from ".";

const getParticipants = async () => {
    try {
        const response = await host.get("/participants");

        return response;
    } catch (error) {
        if (error.response) {
            console.log("Error while loading participants. Code: " + error.response.status);

            return error.response;
        } else if (error.request) {
            console.log("Server did not respond.");
        } else {
            console.log("Error while creating request");
        }
    }
};

const postParticipant = async (participant) => {
    try {
        const response = await host.post("/participants", participant);

        return response;
    } catch (error) {
        if (error.response) {
            console.log("Error while posting the participant. Code: " + error.response.status);

            return error.response;
        } else if (error.request) {
            console.log("Server did not respond.");
        } else {
            console.log("Error while creating request");
        }
    }
};

const deleteParticipant = async (id) => {
    try {
        const response = await host.delete(`/participants/${id}`);

        return response;
    } catch (error) {
        if (error.response) {
            console.log("Error while deleting the participant. Code: " + error.response.status);

            return error.response;
        } else if (error.request) {
            console.log("Server did not respond.");
        } else {
            console.log("Error while creating request");
        }
    }
};

export { getParticipants, postParticipant, deleteParticipant };
