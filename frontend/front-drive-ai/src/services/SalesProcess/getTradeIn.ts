import httpInstance from "services/httpInstance";

export const getTradeIn = async () => {
    let res: any; 
    const endpoint = `/v1/sales-process/trade-in-vehicle/trade-in-vehicles`;
    await httpInstance.get(endpoint).then((response) => {
        res = response;
        console.log(res);
    }).catch((err) => {
        res = err.response;
        console.log(err.response);
    })
    return res;
}