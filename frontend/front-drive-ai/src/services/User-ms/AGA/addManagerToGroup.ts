import httpInstance from "../../httpInstance";

export const addManagerToGroup = async (userId: number, automotiveGroupId: number) => {
  const endpoint = `v1/automotive-group/assign-user/${userId}/${automotiveGroupId}`;
  return httpInstance.post(endpoint)
    .then(response => {
      return response.data
    })
    .catch((err) => {
      throw Error(err)
    });
};
