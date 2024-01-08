import httpInstance from "../../httpInstance";

interface Dealership {
  id: number,
  name: string
}

export const getDealershipsByAGId = async (groupId: number) => {
  const endpoint = `/v1/dealership/getByAutomotiveGroup/${groupId}`;
  return httpInstance.get(endpoint)
    .then(response => {
      return response.data && response.data.map((dealership: Dealership) => ({ value: dealership.id, label: dealership.name }))
    })
    .catch(err => {
      throw Error(err)
    });
};
