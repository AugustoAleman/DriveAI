import httpInstance from "services/httpInstance";

export const getAssignedByManager = async () => {
    let res: any;
    const endpoint = `v1/vehicle/getAssignedByManager`;
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
