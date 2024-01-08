import httpInstance from "services/httpInstance";

export const getCompareCarsList = async (numbersArray: number[]) => {
    let res: any;
    const endpoint = "/v1/vehicle/compare/get";
    await httpInstance.post(endpoint, numbersArray).then((response) => {
      res = response;
    }).catch((err) => {
      res = [];
    });
    return res;
  }

