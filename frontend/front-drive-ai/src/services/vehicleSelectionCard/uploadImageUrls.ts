import httpInstance from "services/httpInstance";

export const uploadImageUrls = async (dealershipVehicleId: number, urlData: any) => {
    let res: any;
    const endpoint = `v1/vehicle/uploadImageUrls?dealerShipVehicleId=${dealershipVehicleId}`;
    await httpInstance.post(endpoint,urlData).then((response) => {
        res = response;
    }).catch((err) => {
        res = err.response;
    });
    return res;
}