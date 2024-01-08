export interface Column {
  id: "retailer_name" | "registration_date" | "supervisor" | "id" | "status";
  label: string;
  minWidth?: number;
  align?: "right" | "center" | "left";
  format?: (value: number) => string;
}

export interface Data {
  retailer_name: string;
  registration_date: string;
  supervisor: string;
  id: string;
  status: string;
  assignedDealership: string;
}
