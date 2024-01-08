import httpInstance from "services/httpInstance";

export const getRequiredDocumentsDT = async (dealershipId: number) => {
    let res: any;
    const endpoint = `/v1/document-required/get-documents-required-for-test-drive/${dealershipId}`;
    await httpInstance.get(endpoint).then((response) => {
        res = response;
    }).catch((err) => {
        res = err;
    });
    return res;
}