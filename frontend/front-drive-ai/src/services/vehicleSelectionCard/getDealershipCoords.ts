import httpInstance from "services/httpInstance";

export const getDealershipCoords = async (dealershipId: number) => {
    let res: any;
    const endpoint = `v1/dealership/findDealershipCoordinates/${dealershipId}`;
    await httpInstance.get(endpoint ).then((response) => {
      res = response;
      console.log(res);
    }).catch((err) => {
      res = err.response;
    });
    return res;
  }