import httpInstance from "services/httpInstance";

export async function getSalesmanSales(body: any) {
    let res: any;
    const endpoint = `v1/document/mock/salesStatus`;
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
