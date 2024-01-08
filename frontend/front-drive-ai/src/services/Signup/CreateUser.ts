import httpInstance from "services/httpInstance";

export const createUser = async (
    user_type: string,
    name: string,
    surname: string,
    email: string,
    cellphone: string,
    telephone: string,
    dateOfBirth: string,
    password: string,
    is_deleted: boolean = false
    ) => {

    let res: any;

    const endpoint = "/v1/user/create";

    const body = {
        user_type: user_type,
        name: name,
        surname: surname,
        email: email,
        cellphone: cellphone,
        telephone: telephone,
        dateOfBirth: dateOfBirth,
        password: password,
        isDeleted: is_deleted
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

