import httpInstance from "services/httpInstance";

export async function getNewUsersCount() {
    let res: any;
    const endpoint = `v1/document/mock/new-users`;
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