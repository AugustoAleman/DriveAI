import httpInstance from "services/httpInstance";

export async function getRequestsById(id: string) {
  let res: any;
  const endpoint = `v1/admissionRequests/get/${id}`;
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
