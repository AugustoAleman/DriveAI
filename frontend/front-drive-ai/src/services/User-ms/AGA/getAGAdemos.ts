import httpInstance from "services/httpInstance";

export async function getAGAdemos(groupId: string) {
    let res: any;
    const endpoint = `v1/document/mock/aga-demos?groupId=${groupId}`;
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