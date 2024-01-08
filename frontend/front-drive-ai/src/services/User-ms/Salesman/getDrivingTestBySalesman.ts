import httpInstance from "services/httpInstance";

export const getDrivingTestBySalesman = async (id: number) => {
    let res: any;
  const endpoint = `v1/drivingTest/findSalesmanDrivingTestById?id=${id}`;
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