import httpInstance from "services/httpInstance";

export const getVehicleById = async (vehicleId: any) => {
    let res: any;
    const endpoint = `v1/vehicle/findById?id=${vehicleId}`;
    await httpInstance.get(endpoint).then((response) => {
        res = response;
    }).catch((err) => {
        res = err.response;
    });
    return res;
}
export const getAdminsVehiclesById = async (vehicleId: any, managerId:any) => {
    let res: any;
    const endpoint = `v1/vehicle/AdminVehiclesById?vehicleId=${vehicleId}&managerId=${managerId}`;
    await httpInstance.get(endpoint).then((response) => {
        res = response;
        
    }).catch((err) => {
        res = err.response;
    });
    return res;
}
export const getSalesmanVehiclesById = async (vehicleId: any) => {
    let res: any;
    const endpoint = `v1/vehicle/getSalesmanVehicleWithDealershipVehicleId?id=${vehicleId}`;
    await httpInstance.get(endpoint).then((response) => {
        res = response;
        
    }).catch((err) => {
        res = err.response;
    });
    return res;
}