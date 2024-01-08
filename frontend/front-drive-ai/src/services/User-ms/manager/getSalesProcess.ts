import httpInstance from "services/httpInstance";

export async function getSalesProcess() {
    let res: any;
    const endpoint = `v1/sales-process/sale/invoice/details`;
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
  