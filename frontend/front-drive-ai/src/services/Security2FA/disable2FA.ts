import httpInstance from "../httpInstance";

export const disable2FA = async (
    userId: string,
) => {

    let res: any;

    const endpoint = "/v1/2fa/disable";

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