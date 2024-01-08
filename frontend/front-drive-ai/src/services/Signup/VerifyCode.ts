import httpInstance from "../httpInstance";

export const verifyCode = async (email: string, code: string) => {
  let res: any;
  const endpoint = "/v1/user/verifyCode";

  const body = {
    email: email,
    code: code,
  };

  await httpInstance
    .post(endpoint, body)
    .then((data) => {
      res = data;
    })
    .catch((err: { response: any }) => {
      res = err.response;
    });

  return res;
};
