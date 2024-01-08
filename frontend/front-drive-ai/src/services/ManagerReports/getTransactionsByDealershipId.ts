import httpInstance from "services/httpInstance";

export const getTransactionsByDealershipId = async (dealership_id?: string) => {
    let res: any;
    const endpoint = `v1/sales-process/transactions/dealership/${dealership_id}`;
    await httpInstance.get(endpoint).then((response) => {
        res = response;
    }).catch((err) => {
        throw new Error(err)
    })
    return res;
}