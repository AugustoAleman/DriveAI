import httpInstance from "services/httpInstance";

export const createUpdateDocument = async (documentData: any) => {
	const headers = { "Content-Type": "multipart/form-data" };

	const endpoint = `v1/s3/create-update-document?filePath=${documentData.filePath}&externalTable=${documentData.externalTable}&externalId=${documentData.externalId}&reqDocId=${documentData.reqDocId}`;

	return httpInstance
		.post(endpoint, documentData.newFile, { headers })
		.then((response) => {
			return response.data;
		})
		.catch((err) => {
			throw new Error(err);
		});
};