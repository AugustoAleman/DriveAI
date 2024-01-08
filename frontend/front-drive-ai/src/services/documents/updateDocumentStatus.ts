import httpInstance from "../httpInstance";
import {DemoSaleDocument} from "../../components/RequestDocuments/types";

export const updateDocumentStatus = async (documentStatus: string ,document: DemoSaleDocument | undefined) => {
  if (!document) throw Error("Document is undefined");

  const endpoint = `v1/document/update/${document.documentId}`;
  const data = {
    storageUrl: document.storageUrl,
    status: documentStatus,
    ocrChecked: document.ocrChecked
  }
  return httpInstance
    .put(endpoint, { ...data })
    .then(response => response && response.data)
    .catch(err => {
      throw Error(err)
    });
};

export default updateDocumentStatus;