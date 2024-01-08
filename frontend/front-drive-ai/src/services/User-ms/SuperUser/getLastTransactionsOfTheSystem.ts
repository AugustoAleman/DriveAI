import httpInstance from "services/httpInstance";

export async function getLastTransactionsOfTheSystem () {
  let response: any;
  const endpoint = `/v1/sales-process/pay/customers`;
  return httpInstance.get(endpoint)
    .then(response => {
      return response.data
    })
    .catch(err => {
      throw new Error(err);
    })
};