import httpInstance from "../httpInstance";

interface ChatRequestBody {
  user: {
    id: string,
    nickname: string
  },
  vendor: {
    id: string,
    nickname: string
  }
}

export const createGroupChannel = async (users: ChatRequestBody) => {
  const { user, vendor } = users;

  const endpoint = `https://api-${process.env.REACT_APP_SENDBIRD_APP_ID}.sendbird.com/v3/group_channels`;
  const headers = {
    "Content-Type": "application/json; charset=utf8",
    "Api-Token": process.env.REACT_APP_SENDBIRD_APP_TOKEN
  };
  const data = {
    user_ids: [user.id, vendor.id],
    operator_ids: [vendor.id],
    name: `Cliente ${user.nickname} con vendedor ${vendor.nickname}`,
    is_distinct: true,
    strict: true
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