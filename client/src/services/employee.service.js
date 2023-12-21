import handleRequest from "../utils/handleRequest";

export const getAllEmployees = async (page) => {
    return handleRequest({
        path: "/employees",
        params: {
            page,
        },
    });
};

export const createEmployee = (data) => {
    return handleRequest({
        path: "/employees",
        method: "POST",
        body: data,
    });
};

export const sendEmails = (data) => {
    return handleRequest({
        path: "/email",
        method: "POST",
        body: data,
    });
};
