import axios from "axios";

const handleRequest = async ({ path, method = "GET", params = {}, body = null, contentType }) => {
    const defaultConfig = {
        baseURL: "http://localhost:5000/api/v1",
        timeout: 5000,
        headers: {
            "Content-Type": contentType ?? "application/json",
        },
    };

    try {
        const response = await axios({
            method,
            url: path,
            params,
            data: body,
            ...defaultConfig,
        });

        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export default handleRequest;
