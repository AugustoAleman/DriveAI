import httpInstance from "services/httpInstance";

export async function getDrivingTestsAG(groupBy: string) {
    let res: any;
    const endpoint = `v1/document/mock/drive-tests?groupBy=${groupBy}`;
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