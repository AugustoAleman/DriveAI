export interface Data {
  accountNumber: string;
  name: string;
  bank: string;
  interbankClabe: string;
  modifiedDate: string;
  status: string;
  details: string;
}

export interface Column {
  id:
    | "accountNumber"
    | "name"
    | "bank"
    | "interbankClabe"
    | "modifiedDate"
    | "status"
    | "details";
  label: string;
  minWidth?: number;
  align?: "right" | "center" | "left";
  format?: (value: number) => string;
}
