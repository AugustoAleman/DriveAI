import httpInstance from "services/httpInstance";

export async function putPlanTypeByUserId(userId: any, body: any) {
  let res: any;
  const endpoint = `/v1/sales-process/subscriptions/update-plan/${userId}`;
  await httpInstance
    .put(endpoint, body)
    .then((data) => {
      res = data;
    })
    .catch((err) => {
      res = err.response;
    });
  return res;
}