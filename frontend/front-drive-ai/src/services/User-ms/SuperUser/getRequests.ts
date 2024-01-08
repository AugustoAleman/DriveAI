import httpInstance from "services/httpInstance";

export async function getRequests() {
  let res: any;
  const endpoint = `v1/admissionRequests/getAll`; //Here goes the endpoint to get the user data
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
