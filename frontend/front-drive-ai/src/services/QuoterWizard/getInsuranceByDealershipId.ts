import httpInstance from "services/httpInstance";

export const getInsuranceByDealershipId = async (dealershipId: number) => {
    let res: any; 
    const endpoint = `v1/insurance/listInsurancesByDealership/${dealershipId}`;
    await httpInstance.get(endpoint).then((response) => {
        res = response;
        console.log(res);
    }).catch((err) => {
        res = err.response;
        console.log(err.response);
    })
    return res;
}