import httpInstance from "services/httpInstance";

export async function getUsersLogs() {
    let res: any;
    const endpoint = `/v1/user/log/fetch`;
    await httpInstance
        .get(endpoint)
        .then((data) => {
            res = data;
        })
        .catch((err) => {
            res = err.response;
        });
    return res;
}