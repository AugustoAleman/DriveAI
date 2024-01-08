import httpInstance from "services/httpInstance";

interface Address {
	id: number;
	userId: number | null;
	isMain: boolean;
	is_deleted: boolean | null;
	createdAt: string | null;
	updatedAt: string | null;
	deletedAt: null | string;
	date_from: string | null;
	address: string | null;
	date_to: string | null;
	city: string | null;
	state: string | null;
	postal: string | null;
	no_appartment: null | string;
}

export const putAddresses = async (addresses: Address[] | undefined, userId: number | undefined) => {
    console.log(addresses);
	return await httpInstance.put( `/v1/address/update_list/${userId}`, addresses)
	.then((response:any) => {
		console.log(response.data);
		return response.data;
	})
	.catch((error:any) => {
		console.log(error);
		return error;
	});
};