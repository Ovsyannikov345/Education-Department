import { host } from ".";

const getStudents = async () => {
    const response = await host.get("/students");

    return response.data;
};

const postStudent = async (student) => {
    const response = await host.post("/students", student);

    return response;
};

const deleteStudent = async (id) => {
    const response = await host.delete(`/students/${id}`);

    return response;
};

export { getStudents, postStudent, deleteStudent };
