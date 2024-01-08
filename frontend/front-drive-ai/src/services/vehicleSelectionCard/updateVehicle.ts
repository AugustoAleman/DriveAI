import httpInstance from "services/httpInstance";

export const updateVehicle= async (vehicleId: any) => {
    let res: any;
    const endpoint = `v1/vehicle/update`;
    await httpInstance.put(endpoint,vehicleId).then((response) => {
        res = response;
        
    }).catch((err) => {
        res = err.response;
    });
    return res;
}