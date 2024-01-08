import httpInstance from "services/httpInstance";

export const setFavorite = async (dealershipId: number) => {
    let res: any;
    const endpoint = `v1/vehicle/favorite/set?dealershipVehicleId=${dealershipId}`;
    await httpInstance.put(endpoint).then((response) => {
        res = response;
    }).catch((err) => {
        res = [];
    });
    return res;
}