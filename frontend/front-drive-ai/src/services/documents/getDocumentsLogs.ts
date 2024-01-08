import httpInstance from "services/httpInstance";

export async function getDocumentsLogs() {
    let res: any;
    const endpoint = `/v1/log/list`; //Here goes the endpoint to get the user data
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