import httpInstance from "../../httpInstance";

export const unAssignDealershipToUser = async (userID: number, dealershipId: number) => {
  const endpoint = `v1/dealership/${userID}/unassignDealership?dealershipId=${dealershipId}`;
  return httpInstance.delete(endpoint)
    .then(response => {
      return response.data
    })
    .catch((err) => {
      throw Error(err)
    });
};
