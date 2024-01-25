import { host } from ".";
import updateToken from "../utils/updateToken";

const getStudents = async () => {
    try {
        const response = await host.get("/students");

        return response;
    } catch (error) {
        if (error.response) {
            console.log("Error while loading students. Code: " + error.response.status);

            if (error.response.status === 401) {
                return await updateToken(getStudents);
            }

            return error.response;
        } else if (error.request) {
            console.log("Server did not respond.");
        } else {
            console.log("Error while creating request");
        }
    }
};

const postStudent = async (student) => {
    try {
        const response = await host.post("/students", student);

        return response;
    } catch (error) {
        if (error.response) {
            console.log("Error while posting the student. Code: " + error.response.status);

            if (error.response.status === 401) {
                return await updateToken(postStudent, student);
            }

            return error.response;
        } else if (error.request) {
            console.log("Server did not respond.");
        } else {
            console.log("Error while creating request");
        }
    }
};

const deleteStudent = async (id) => {
    try {
        const response = await host.delete(`/students/${id}`);

        return response;
    } catch (error) {
        if (error.response) {
            console.log("Error while deleting the student. Code: " + error.response.status);

            if (error.response.status === 401) {
                return await updateToken(deleteStudent, id);
            }

            return error.response;
        } else if (error.request) {
            console.log("Server did not respond.");
        } else {
            console.log("Error while creating request");
        }
    }
};

export { getStudents, postStudent, deleteStudent };
