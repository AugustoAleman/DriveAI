import httpInstance from "services/httpInstance";

export const sendVerificationCodeToChange = async (email: string) => {
  let res: any;

  const endpoint = "/v1/user/sendVerificationCodeToChangeEmail";

  const body = {
    email: email,
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
