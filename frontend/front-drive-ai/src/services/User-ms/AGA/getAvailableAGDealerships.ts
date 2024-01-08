import httpInstance from "../../httpInstance";

interface Dealership {
  id: number,
  name: string
}

export const getAvailableAGDealerships = async (groupId: number) => {
  const endpoint = `v1/dealership/findDealership_WO_ManagerByAutomotiveGroupId/${groupId}`;
  return httpInstance.get(endpoint)
    .then(response => {
      return response.data && response.data.map((dealership: Dealership) => ({ value: dealership.id, label: dealership.name }))
    })
    .catch(err => {
      throw Error(err)
    });
};
