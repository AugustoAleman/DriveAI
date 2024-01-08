import httpInstance from "services/httpInstance";

export async function getSuperUserTotals() {
    let res: any;
    const endpoint = `v1/document/mock/su-totals`;
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