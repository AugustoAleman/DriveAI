import httpInstance from "services/httpInstance";

export async function getActiveSales() {
  let res: any;
  const endpoint = `activeSales`; //Here goes the endpoint to get the active sales
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
