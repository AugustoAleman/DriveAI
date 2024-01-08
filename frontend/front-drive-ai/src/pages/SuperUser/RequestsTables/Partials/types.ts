export interface Data {
  id: string;
  Name: string;
  Address: string;
  Date: string;
  Group: string;
  Status: string;
}

export interface Column {
  id: "id" | "contactName" | "direction" | "date" | "groupName" | "status";
  label: string;
  minWidth?: number;
  align?: "right" | "center" | "left";
  format?: (value: number) => string;
}
