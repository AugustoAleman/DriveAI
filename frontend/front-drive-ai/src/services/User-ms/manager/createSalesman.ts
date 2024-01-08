import httpInstance from "../../httpInstance";

export async function createSalesman(body: any) {
    let res: any;
    const endpoint = `/v1/user/create`;
    await httpInstance
        .post(endpoint, body)
        .then((data) => {
            res = data;
        }
        )
        .catch((err) => {
            res = err.response;
        }
        );
    return res;
}
