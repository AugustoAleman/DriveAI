import httpInstance from "services/httpInstance";

export const getOccupiedDates = async (dealershipVehicleId: number) => {
    let res: any;
    const endpoint = "v1/drivingTest/getDTsByDealershipVehicleId?id="+dealershipVehicleId;
    await httpInstance.post(endpoint).then((response) => {
        res = response;
    }).catch((err) => {
        res = err.response;
    });
    return res;
}