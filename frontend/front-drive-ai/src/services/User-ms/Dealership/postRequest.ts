import httpInstance from "services/httpInstance";

export async function postRequest(body: any) {
    let res: any;
    const endpoint = `v1/dealership/create`;
    await httpInstance
        .post(endpoint, body)
        .then((data) => {
            res = data;
        })
        .catch((err) => {
            res = err.response;
        });
    return res;
}
