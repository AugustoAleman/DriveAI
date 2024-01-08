import httpInstance from 'services/httpInstance';

const createUpdateDocument = async (documentData: any) => {
  const endpoint = `/v1/s3/create-update-document?filePath=${documentData.filePath}&externalTable=${documentData.externalTable}&externalId=${documentData.externalId}&reqDocId=${documentData.reqDocId}`;

  return httpInstance
    .post(endpoint, documentData.newFile)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
};

export default createUpdateDocument;
