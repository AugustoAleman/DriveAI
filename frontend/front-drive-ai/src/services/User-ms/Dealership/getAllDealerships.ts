import httpInstance from "services/httpInstance";

export async function getAllDealerships() {
    let res: any;
    const endpoint = `/v1/dealership/list`;
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