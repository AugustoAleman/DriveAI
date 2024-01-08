import httpInstance from "../httpInstance";

export const getCredentials = async (
    email: string,
    password: string,
) => {

    let res: any;

    const endpoint = "/v1/user/logintest";

    const body = {
        email: email,
        password: password,
    };

    await httpInstance
        .post(endpoint, body)
        .then((data) => {
            res = data;
        })
        .catch((err: { response: any }) => {
                res = err.response;
            }
        );

    return res;
}