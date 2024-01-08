import httpInstance from "../../httpInstance";

export const getDealershipAdministration = async () => {
    let res: any;
    const endpoint = `/v1/sales-process/bank-account/list`;
    await httpInstance
    .get(endpoint)
    .then((data) => {
      res = data;
    })
    .catch((err) => {
      res = err.response;
    });
  return res;
};
