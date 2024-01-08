import httpInstance from "services/httpInstance";

export async function getHistoryPurchase(id: number) {
    let res: any;
    const endpoint = `v1/sales-process/invoice/user-purchase-history/${id}`; //Here goes the endpoint to get the history purchase
    await httpInstance
        .get(endpoint)
        .then((data) => {
            res = data;
        }
        )
        .catch((err) => {
            res = err.response;
        }
        );
    return res;
}