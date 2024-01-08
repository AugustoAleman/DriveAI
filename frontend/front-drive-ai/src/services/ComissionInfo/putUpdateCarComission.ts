import httpInstance from "services/httpInstance";

export async function putUpdateCarComission(body:any) {
  let res;
  const endpoint = "/v1/sales-process/commissions/car-commission";
  const headers = {
    "Content-Type": "application/json", // Agrega el encabezado Content-Type
  };

  try {
    const response = await httpInstance.put(endpoint, body, { headers });
    res = response.data;
  } catch (error:any) {
    res = error.response;
  }

  return res;
}