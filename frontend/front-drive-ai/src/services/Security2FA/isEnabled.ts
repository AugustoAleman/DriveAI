import httpInstance from "../httpInstance";

export const isEnabled = async (
    email: string,
)=> {

    let res: any;

    const endpoint = `/v1/2fa/enabled/${email}`;

    await httpInstance
        .get(endpoint)
        .then((data) => {
            res = data;
        })
        .catch((err: { response: any }) => {
                res = err.response;
            }
        );

    return res;
}