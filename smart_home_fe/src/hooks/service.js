import { makeRequest } from "../makeRequest";

export const postLogin = async (request) => {
    const res = await makeRequest.post("public/login", request);
    return res.data;
}