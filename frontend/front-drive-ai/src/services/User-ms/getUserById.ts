import httpInstance from "../httpInstance";

export const getUserById = async (userId: number) => {
  const endpoint = `/v1/user/findById/${userId}`;
  return httpInstance.get(endpoint)
    .then(response => {
      return response && response.data
    })
    .catch(err => {
      throw Error(err)
    });
};