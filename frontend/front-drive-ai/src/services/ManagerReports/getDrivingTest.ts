import httpInstance from "services/httpInstance";

export const getDrivingTest = async (dealership_id: number) => {
    let res: any;
    const endpoint = `v1/drivingTest/reportByDealershipId?id=${dealership_id}`;
    await httpInstance.get(endpoint).then((response) => {
        res = response;
    }).catch((err) => {
        throw new Error(err)
    })
    return res;
}