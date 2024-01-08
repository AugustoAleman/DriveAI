import httpInstance from "../httpInstance";

export const resetPassword = async (token: string, newPassword:string) => {
    let res: any;

    const endpoint = '/v1/user/resetPassword';

    const body = {
        token: token,
        newPassword: newPassword
    };

    await httpInstance
        .post(endpoint, body)
        .then((data) => {
            res = data;
        })
        .catch((err: { response: any; }) => {
            res = err.response;
        });

    return res;
}