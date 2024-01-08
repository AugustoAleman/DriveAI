export interface Column {
  id:
    | "dealership_id"
    | "dealership_name"
    | "dealership_address"
    | "date"
    | "person_in_charge"
    | "status"
    | "details";
  label: string;
  minWidth?: number;
  align?: "right" | "center" | "left";
  format?: (value: number) => string;
}

export interface Data {
    dealership_id: string;
    dealership_name: string;
    dealership_address: string;
    date: string;
    person_in_charge: string;
    status: string;
    details: string;
}