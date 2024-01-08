import httpInstance from "services/httpInstance";

export async function putRequest(body: any) {
  let res: any;
  const endpoint = `v1/admissionRequests/update`;
  await httpInstance
    .put(endpoint, body)
    .then((data) => {
      res = data;
    })
    .catch((err) => {
      res = err.response;
    });
  return res;
}
