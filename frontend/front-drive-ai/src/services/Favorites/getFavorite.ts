import httpInstance from "services/httpInstance";

export const getFavorite = async () => {
    let res: any;
    const endpoint = `v1/vehicle/favorite/get`;
    await httpInstance.get(endpoint).then((response) => {
        res = response;
    }).catch((err) => {
        res = [];
    });
    return res;
}