import httpInstance from "services/httpInstance";

export async function getLastTransactions() {
    let res: any;
    const endpoint = `v1/mock/lastTransactions`;
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
  