import httpInstance from "services/httpInstance";

export const getSalesmanSalesProcesses = async (id: number) => {
	let res: any;
	const endpoint = `v1/sales-process/invoice/seller-order-status-by-id/${id}`;
	await httpInstance
		.get(endpoint)
		.then((data) => {
			res = data;
		})
		.catch((err) => {
			res = err.response;
		});
	return res;
};
