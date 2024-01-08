import httpInstance from "services/httpInstance";

export const updateDealership = async (
    id: string,
    name: string,
    addressId: number,
) => {
    let res: any;

    const endpoint = "/v1/dealership/update";

    const body = {
        id: id,
        name: name,
        address: {
            id: addressId
        }
    };

    await httpInstance
    .put(endpoint, body)
    .then((data) => {
        res = data;
    }
    ).catch((err: { response: any }) => {
        res = err.response;
    }
    );

    return res;
}