import httpInstance from "services/httpInstance";

export const getAssignedBySalesman = async () => {
    let res: any;
    const endpoint = `v1/vehicle/getAssignedBySalesman`;
    await httpInstance
        .get(endpoint)
        .then((data) => {
            res = data
        })
        .catch((err) => {
            res = err.response;
        });
        return res;
} 
