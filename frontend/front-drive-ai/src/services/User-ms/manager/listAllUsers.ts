import httpInstance from "../../httpInstance";

export async function listAllUsers() {
    let res: any;
    const endpoint = `/v1/user/list`;
    await httpInstance
        .get(endpoint)
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
