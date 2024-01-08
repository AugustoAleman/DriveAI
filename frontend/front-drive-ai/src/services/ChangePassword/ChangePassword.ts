import httpInstance from "services/httpInstance";

export const changePassword = async (
    email: string,
    password: string,
    newPassword: string,
    ) => {

    let res: any;

    const endpoint = "/v1/user/updatePassword";

    const body = {
        email: email,
        oldPassword: password,
        newPassword: newPassword,
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
    };

