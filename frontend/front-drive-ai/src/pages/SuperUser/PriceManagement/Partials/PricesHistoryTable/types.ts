export interface Data {
  carCommission: string;
  registerCommission: string;
  saleCommission: string;
  subscriptionPriceEnterprise: string;
  subscriptionPriceFree: string;
  subscriptionPricePlus: string;
  subscriptionPricePro: string;
  timestamp: string;
}

export interface Column {
  id:
    | "carCommission"
    | "registerCommission"
    | "saleCommission"
    | "subscriptionPriceEnterprise"
    | "subscriptionPriceFree"
    | "subscriptionPricePlus"
    | "subscriptionPricePro"
    | "timestamp";
  label: string;
  minWidth?: number;
  align?: "right" | "center" | "left";
  format?: (value: number) => string;
}
