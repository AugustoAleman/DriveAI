import httpInstance from "services/httpInstance";

export async function getBankAccountsHistory() {
    let res: any;
    const endpoint = `v1/mock/bankAccountsHistory`;
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
  