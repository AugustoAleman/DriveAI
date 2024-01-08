import httpInstance from "services/httpInstance";

export const getVehiclesLogs = async () => {
    let res: any;

    const endpoint = `/v1/vehicle/logs/get`;

    await httpInstance
        .get(endpoint)
        .then((data) => {
            res = data;
        })
        .catch((err: { response: any; }) => {
            res = err.response;
        });

    return res;
}