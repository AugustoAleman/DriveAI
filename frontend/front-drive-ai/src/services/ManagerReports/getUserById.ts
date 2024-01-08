import httpInstance from "services/httpInstance";

export const getUserById = async (user_id?: string) => {
    let res: any;
    const endpoint = `v1/user/findById/${user_id}`;
    await httpInstance.get(endpoint).then((response) => {
        res = response;
    }).catch((err) => {
        throw new Error(err)
    })
    return res;
}