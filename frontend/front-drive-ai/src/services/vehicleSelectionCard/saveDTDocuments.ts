import httpInstance from "services/httpInstance";

export const saveDTDocuments = async (listDocsIds: string, formData: FormData) => {
    let res: any;
    const endpoint = `/v1/drivingTest/uploadDrivingTestFiles/${listDocsIds}`;
    await httpInstance.post(endpoint, formData).then((response) => {
        res = response;
    }).catch((err) => {
        res = err;
    });
    return res;
}