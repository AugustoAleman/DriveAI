import httpInstance from "services/httpInstance";


export const getDealershipById = async (dealershipId: number) => {
    const endpoint = `/v1/dealership/findById/${dealershipId}`;
    return httpInstance.get(endpoint)
        .then(response => {
            return response.data;
        })
        .catch(err => {
        throw Error(err)
        });
};