import { host } from ".";
import updateToken from "../utils/updateToken";

const getParticipants = async () => {
    try {
        const response = await host.get("/participants");

        return response;
    } catch (error) {
        if (error.response) {
            console.log("Error while loading participants. Code: " + error.response.status);

            if (error.response.status === 401) {
                return await updateToken(getParticipants);
            }

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

            if (error.response.status === 401) {
                return await updateToken(postParticipant, participant);
            }

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

            if (error.response.status === 401) {
                return await updateToken(deleteParticipant, id);
            }

            return error.response;
        } else if (error.request) {
            console.log("Server did not respond.");
        } else {
            console.log("Error while creating request");
        }
    }
};

export { getParticipants, postParticipant, deleteParticipant };
