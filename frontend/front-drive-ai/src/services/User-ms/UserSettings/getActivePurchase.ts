import httpInstance from "services/httpInstance";

interface purchaseHistory {
    createdAt: string;
    sellerName: string;
    dealershipInfo: {
        name: string;
        city: string;
        address: string;
    }
    vehicleInfo: {
        name: string;
        price: number;
    }
    orderStatus: string;
}

interface purchaseHistoryResponse {
    transactions: Array<purchaseHistory>;
}

export async function getActivePurchase(id:number) {
  let res: any;
  const endpoint = `v1/sales-process/invoice/user-orders/${id}`; //Here goes the endpoint to get the active sales
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
