import httpInstance from "services/httpInstance";

export async function getDocumentsById(id: string) {
    let res: any;
    const endpoint = `v1/document/get-documents-for-automotive-group/${id}`;
    await httpInstance
      .get(endpoint)
      .then((data) => {
        res = data;
      })
      .catch((err) => {
        res = err.response;
      });
    return res;
  }
  