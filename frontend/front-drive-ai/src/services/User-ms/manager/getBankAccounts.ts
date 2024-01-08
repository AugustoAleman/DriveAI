import httpInstance from "services/httpInstance";

export async function getBankAccounts() {
    let res: any;
    const endpoint = `v1/mock/bankAccounts`;
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
  