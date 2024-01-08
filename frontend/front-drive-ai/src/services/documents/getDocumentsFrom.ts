import httpInstance from "../httpInstance";

export const getDocumentsFrom = async (externalTable: string, externalId: number) => {
  const endpoint = `v1/document/get-documents-from/${externalTable}/${externalId}`;
  return httpInstance
    .get(endpoint)
    .then(response => response && response.data)
    .catch(err => {
      throw Error(err)
    });
};

export default getDocumentsFrom;