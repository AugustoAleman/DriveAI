import httpInstance from "services/httpInstance";

export async function getSalesmanDemos(body: any) {
    let res: any;
    const endpoint = `v1/document/mock/salesman-demos`;
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
