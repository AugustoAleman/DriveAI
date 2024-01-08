import httpInstance from "services/httpInstance";

export const getRequests = async () => {
  let res: any;
  const endpoint = `v1/sales-process/bank-account/list`;
  await httpInstance
    .get(endpoint)
    .then((data) => {
      res = data;
      console.log(res)
    })
    .catch((err) => {
      res = err.response;
    });
  return res;
};
