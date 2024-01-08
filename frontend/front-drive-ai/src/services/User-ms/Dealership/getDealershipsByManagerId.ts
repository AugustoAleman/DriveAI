import httpInstance from "../../httpInstance";

export const getDealershipsByManagerId = async (userId: number) => {
    const endpoint = `/v1/dealership/listDealershipsUnderManager/${userId}`;
    return httpInstance.get(endpoint)
        .then(response => {
            return response && response.data
        })
        .catch(err => {
            throw Error(err)
        });
};