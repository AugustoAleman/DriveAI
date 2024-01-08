import httpInstance from "services/httpInstance";

export const getAGATotals = async (groupId:string) => {
    let res: any;

    const endpoint = `v1/document/mock/aga-totals?groupId=${groupId}`;

    await httpInstance
        .get(endpoint)
        .then((data) => {
            res = data;
        })
        .catch((err: { response: any; }) => {
            res = err.response;
        });

    return res;
}