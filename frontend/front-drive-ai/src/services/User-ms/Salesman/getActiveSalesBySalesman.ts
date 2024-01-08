import httpInstance from "services/httpInstance";

export const getActiveSalesBySalesman = async (id: number | undefined) => {
	console.log("ID is: ", id);

	return await httpInstance.get(
		`v1/sales-process/invoice/seller-details/${id}`
	).then((response) => {
		console.log("Response is: ", response);
		return response.data;
	}).catch((error) => {
		console.log("Error is: ", error);
		return error;
	});
};
