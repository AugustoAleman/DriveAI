import httpInstance from "../httpInstance";

export const preActivate2FA = async (
    userId: number,
    ) => {

    let res: any;

    const endpoint = "/v1/2fa/enable";

    const body = {
        userId: userId,
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