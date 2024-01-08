import httpInstance from "../../httpInstance";

export const assignDealershipToUser = async (userID: number, dealershipId: number) => {
  const endpoint = `v1/dealership/${userID}/assignDealership?dealershipId=${dealershipId}`;
  return httpInstance.post(endpoint)
    .then(response => {
      return response.data
    })
    .catch((err) => {
      throw Error(err)
    });
};
