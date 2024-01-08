import httpInstance from "services/httpInstance";

export const getVehicleById = async (vehicleId: any) => {
    let res: any; 
    const endpoint = `v1/vehicle/findById?id=${vehicleId}`;
    await httpInstance.get(endpoint).then((response) => {
        res = response;
    }).catch((err) => {
        res = err.response;
    })
    return res;
}