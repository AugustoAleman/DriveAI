import httpInstance from "../httpInstance";
import {registerUser} from "./registerUser";

interface User {
  id: string,
  nickname: string
}

export const getOrCreateUser = async (user: User) => {
  const getUserEndpoint = `https://api-${process.env.REACT_APP_SENDBIRD_APP_ID}.sendbird.com/v3/users/${user.id}`;
  const headers = {
    "Content-Type": "application/json; charset=utf8",
    "Api-Token": process.env.REACT_APP_SENDBIRD_APP_TOKEN
  };
  return httpInstance
    .get(getUserEndpoint, { headers })
    .then((res) => {
      return res.data
    })
    .catch(async () => {
      return await registerUser(user.id, user.nickname)
    });
};