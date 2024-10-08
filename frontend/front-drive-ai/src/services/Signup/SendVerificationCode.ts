import axios from "axios";
import httpInstance from "../httpInstance";

export const sendVerificationCode = async (email: string) => {
  let res: any;
  const endpoint = "/v1/user/sendVerificationCode";

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
