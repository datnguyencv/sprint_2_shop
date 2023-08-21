import { makeRequest } from "../makeRequest";

export const postLogin = async (request) => {
    const res = await makeRequest.post("public/login", request);
    return res.data;
}

export const getEmail = async (genericRequest) => {
    try {
        const res = await makeRequest.post(`forgot_password`, genericRequest);
        console.log(res);
        return res;
    } catch(error){
        console.error("loi hien thi");
    }
}

export const postResetPassword = async (genericRequest) => {
    try {
        const res = await makeRequest.post(`reset_password`, genericRequest);
        console.log(res);
        return res;
    } catch(error){
        console.error("loi hien thi");
    }
}

export const getError = async () => {
    try {
        const res = await makeRequest.post(`403`);
        console.log(res);
        return res;
    } catch(error){
        console.error("loi hien thi");
    }
}