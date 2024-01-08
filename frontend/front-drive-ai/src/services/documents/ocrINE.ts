import httpInstance from "../httpInstance";

export const ocrINE = async (document: FormData) => {
  if (!document) throw Error("Document is undefined");

  const endpoint = `v1/document/get-ocr`;

  return httpInstance
    .post(endpoint, document)
    .then(response => response && response.data)
    .catch(err => {
      throw Error(err)
    });
};

export default ocrINE;