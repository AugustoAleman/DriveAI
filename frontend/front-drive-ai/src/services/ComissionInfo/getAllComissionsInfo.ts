import httpInstance from "../httpInstance";

export async function getAllComissionsInfo () {
  let response: any;
  const endpoint = `/v1/sales-process/commissions/requestAllData`;
  return httpInstance.get(endpoint)
    .then(response => {
      return response.data
    })
    .catch(err => {
      throw new Error(err);
    })
};