import httpInstance from "../../httpInstance";

export async function getAgencyManager(id: string | undefined) {
    let res: any;
    const endpoint = `/v1/dealership/listDealershipsUnderManager/${id}`;
    await httpInstance
      .get(endpoint)
      .then((data) => {
        res = data;
      })
      .catch((err) => {
        res = err.response;
      });
    return res;
  }
  
