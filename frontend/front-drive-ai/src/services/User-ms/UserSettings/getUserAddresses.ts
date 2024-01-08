import httpInstance from "services/httpInstance";

export interface Address {
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

export const getUserAddresses = async (
	id: number | undefined
): Promise<any> => {
	try {
		const endpoint = `v1/address/user/${id}/addresses`;
		const response = await httpInstance.get(endpoint);
		const res: Address = response.data;

		return res;
	} catch (error) {
		console.error(error);
		return null;
	}
};
