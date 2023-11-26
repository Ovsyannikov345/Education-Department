import { host } from ".";

const getParticipants = async () => {
    const response = await host.get("/participants");

    return response.data;
};

const postParticipant = async (participant) => {
    const response = await host.post("/participants", participant);

    return response;
};

const deleteParticipant = async (id) => {
    const response = await host.delete(`/participants/${id}`);

    return response;
};

export { getParticipants, postParticipant, deleteParticipant };
