export interface Column {
	id:
		| "manager_id"
		| "manager_name"
		| "assigned_dealership"
		| "registration_date"
		| "status"
		| "details";
	label: string;
	minWidth?: number;
	align?: "right" | "center" | "left";
	format?: (value: number) => string;
}

export interface Data {
	unique_id: string;
	id: string;
	manager_name: string;
	assigned_dealership: string;
	registration_date: string;
	status: string;
	details: string;
}

export interface DealershipDropdownType {
	label: string;
	value: number;
}
