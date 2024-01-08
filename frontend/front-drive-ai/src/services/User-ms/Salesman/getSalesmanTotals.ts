import httpInstance from "services/httpInstance";

export async function getSalesmanTotals(body: any) {
    let res: any;
    const endpoint = `v1/document/mock/salesman-totals`;
    await httpInstance
        .get(endpoint, body)
        .then((data) => {
            res = data;
        })
        .catch((err) => {
            res = err.response;
        });
    return res;
}
