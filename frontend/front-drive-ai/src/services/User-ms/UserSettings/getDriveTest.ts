import httpInstance from "services/httpInstance";

export async function getDriveTest(id: number) {
  console.log("getDriveTest", id)
  let res: any;
  const endpoint = `v1/drivingTest/findByUserId/card?id=${id}`; //Here goes the endpoint to get the drive test
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
