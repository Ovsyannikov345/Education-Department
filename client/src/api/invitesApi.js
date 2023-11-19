import { host } from ".";

export const createInvite = async (invite) => {
    const { data } = await host.post("/invites/create", invite);
    return data;
};

export const fatchAll = async () => {
    const { data } = await host.get("/invites/all");
    return data;
};
