import httpInstance from "services/httpInstance";

export async function getGroupsTransactions() {
    let res: any;
    const endpoint = `v1/sales-process/transactions/get-all-dealerships`;
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