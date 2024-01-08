import httpInstance from "../httpInstance";

export async function getSuscriptionByUserId (userId: any) {
  let response: any;
  const endpoint = `/v1/sales-process/subscriptions/plan-type/${userId}`;
  return httpInstance.get(endpoint)
    .then(response => {
      return response.data
    })
    .catch(err => {
      throw new Error(err);
    })
};