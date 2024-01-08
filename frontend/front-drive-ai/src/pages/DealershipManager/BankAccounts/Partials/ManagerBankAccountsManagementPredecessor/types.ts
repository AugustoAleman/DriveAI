export interface Column {
  id:
    | "NumeroCuenta"
    | "Banco"
    | "ClaveInterbancaria"
    | "FechaModificacion"
    | "AgenciaVinculado"
    | "Estatus";
  label: string;
  minWidth?: number;
  align?: "right" | "center" | "left";
  format?: (value: number) => string;
}

export interface Data {
  NumeroCuenta: string;
  Banco: string;
  ClaveInterbancaria: string;
  FechaModificacion: string;
  AgenciaVinculado: string;
  Estatus: string;
}
