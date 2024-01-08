export interface Column {
  id: "id" | "name" | "email" | "createdAt" | "deletedAt";
  label: string;
  minWidth?: number;
  align?: "right" | "center" | "left";
  format?: (value: number) => string;
}

export interface Data {
  employee_id: string;
  name: string;
  sales: JSX.Element;
  reg_date: string;
  status: string;
}
