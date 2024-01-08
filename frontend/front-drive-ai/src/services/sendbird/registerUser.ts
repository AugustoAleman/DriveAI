import httpInstance from "../httpInstance";

export const registerUser = async (userId: string, userNickname: string) => {
  const endpoint = `https://api-${process.env.REACT_APP_SENDBIRD_APP_ID}.sendbird.com/v3/users`;
  const headers = {
    "Content-Type": "application/json; charset=utf8",
    "Api-Token": process.env.REACT_APP_SENDBIRD_APP_TOKEN
  };

  const data = {
    user_id: userId,
    nickname: userNickname,
    profile_url: ""
  };

  return await httpInstance
    .post(endpoint, { ...data }, { headers })
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      throw new Error(err)
    });
};