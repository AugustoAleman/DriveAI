import httpInstance from "services/httpInstance";




export const getSalesmanManager = async (vehicleData: number) => {
    let res: any;
    const endpoint = `v1/dealership/listSalesmenByManager/${vehicleData}`;
    await httpInstance.get(endpoint ).then((response) => {
      res = response;
      console.log(res);
    }).catch((err) => {
      res = err.response;
    });
    return res;
  }