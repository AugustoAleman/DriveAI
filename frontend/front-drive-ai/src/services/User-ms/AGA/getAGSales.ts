import httpInstance from "services/httpInstance";

export const getAGSales = async (groupId:string) => {
    let res: any;

    const endpoint = `v1/document/mock/aga-monthly-sales?groupId=${groupId}`;

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