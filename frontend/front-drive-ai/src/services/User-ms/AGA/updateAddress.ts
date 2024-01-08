import httpInstance from "services/httpInstance";

export const updateAddress = async (
    id: string,
    userId: string,
    state: string,
    city: string,
    address : string,
    postal : string,
    no_appartment : string,
    isMain : boolean,
    latitude : string,
    longitude : string
) => {
    let res: any;

    const endpoint = "/v1/address/update";

    const body = {
        id: id,
        userId: userId,
        state: state,
        city: city,
        address : address,
        postal : postal,
        no_appartment : no_appartment,
        isMain : isMain,
        latitude : latitude,
        longitude : longitude
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
