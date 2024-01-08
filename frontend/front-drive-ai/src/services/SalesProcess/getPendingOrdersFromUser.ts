import httpInstance from "../httpInstance";

export async function getPendingOrdersFromUser (userId: number) {
  let response: any;
  const endpoint = `/v1/sales-process/order/pending-orders/${userId}`;
  return httpInstance.get(endpoint)
    .then(response => {
      return response.data
    })
    .catch(err => {
      throw new Error(err);
    })
};
