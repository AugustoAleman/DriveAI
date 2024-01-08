import httpInstance from "../../httpInstance";

export const getAdministration = async (agaId: number, option: string) => {
    let res: any;

    const endpoint = `/v1/user/getAdministration/${agaId}/${option}`;

    await httpInstance
        .get(endpoint)
        .then((data) => {
            res = data;
        })
        .catch((err: { response: any; }) => {
            res = err.response;
        });

    return res;
}