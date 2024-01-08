import httpInstance from "services/httpInstance";

export const getCatalogueByQuery = async (query: string) => {
    let res: any;
    const endpoint = `v1/vehicle/getCatalogueCardsByQuery?browseDescription=${query}`;
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