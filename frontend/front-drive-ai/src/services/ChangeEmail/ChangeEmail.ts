import httpInstance from "services/httpInstance";

export const changeEmail = async (email: string, newEmail: string) => {
  let res: any;

  const endpoint = "/v1/user/changeEmail";

  const body = {
    email: email,
    newEmail: newEmail,
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
