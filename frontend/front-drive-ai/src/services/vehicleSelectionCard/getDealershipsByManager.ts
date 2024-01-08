import httpInstance from "services/httpInstance";

export const getDealershipManager = async (vehicleData: number) => {
    let res: any;
    const endpoint = `v1/dealership/listDealershipsUnderManager/${vehicleData}`;
    await httpInstance.get(endpoint ).then((response) => {
      res = response;
      console.log(res);
    }).catch((err) => {
      res = err.response;
    });
    return res;
  }