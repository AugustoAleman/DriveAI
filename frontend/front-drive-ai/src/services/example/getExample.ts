import httpInstance from "../httpInstance";

export const getExample = async () => {
  let res: any;
  const endpoint = `example`;
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
