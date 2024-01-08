import httpInstance from "services/httpInstance";

export const getCatalogByQuery = async (query: string) => {
    let res: any;
    const endpoint = `v1/vehicle/getListByQuery?browseDescription=${query}`;
    await httpInstance
        .get(endpoint)
        .then((data) => {
            res = data;
        })
        .catch((err) => {
            res = err.response;
        });
        return res;
};

export const getCatalogByUserId = async (userId: number) => {
    let res: any;
    const endpoint = `v1/vehicle/getAssignedByUserId?id=${userId}`;
    await httpInstance
        .get(endpoint)
        .then((data) => {
            res = data;
        })
        .catch((err) => {
            res = err.response;
        });
        return res;
}

export const getAssignedByDealershipId = async (dealershipId: number) => {
    let res: any;
    const endpoint = `v1/vehicle/getAssignedByDealershipId?id=${dealershipId}`;
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

export const deletevehicleWithId = async (vehicleId: number) => {
    let res: any;
    const endpoint = `v1/vehicle//delete?id=${vehicleId}`;
    await httpInstance
        .delete(endpoint)
        .then((data) => {
            res = data
        })
        .catch((err) => {
            res = err.response;
        });
        return res;
}