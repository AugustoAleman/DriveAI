import httpInstance from "services/httpInstance";

export interface registerBody 
{
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
    status: string,
    is_deleted: boolean,
    contactName: string,
    direction: string,
    date: string,
    groupName: string,
    contactEmail: string,
    proveOfAddressUrl: string,
    fiscalUrl: string,
    legalDocUrl: string,
    description: string
}

export const registerAutomotiveGroup = async (data: registerBody) => {
    let res: any;
    const endpoint = '/v1/admissionRequests/create';


    await httpInstance
    .post(endpoint, data)
    .then((data) => {
        res = data;
    })
    .catch((err: { response: any; }) => {
        res = err.response;
    });


    return res;
}