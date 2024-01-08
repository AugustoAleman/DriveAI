import httpInstance from "../httpInstance";

export async function getComissionLog () {
  let response: any;
  const endpoint = `/v1/sales-process/commissions-log/getAll`;
  return httpInstance.get(endpoint)
    .then(response => {
      return response.data
    })
    .catch(err => {
      throw new Error(err);
    })
};