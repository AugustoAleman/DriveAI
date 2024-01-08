import httpInstance from "services/httpInstance";

export const activateAutomotiveGroup = async (
    requestId: string
    ) => {

    let res: any;

    const endpoint = "/v1/user/activateAutomotiveGroup";

    const body = {
        requestId: parseInt(requestId),
    };

    await httpInstance
        .post(endpoint, body)
        .then((data) => {
            res = data;
        })
        .catch((err: { response: any }) => {
            res = err.response;
        }
    );  

    return res;
    };

