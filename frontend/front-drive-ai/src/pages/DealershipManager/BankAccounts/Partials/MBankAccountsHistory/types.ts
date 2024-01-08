export interface Column {
  id:
    | "IDTransaccion"
    | "Fecha"
    | "Referencia"
    | "CuentaOrigen"
    | "AgenciaVinculado"
    | "Monto"
    | "Tipo";
  label: string;
  minWidth?: number;
  align?: "right" | "center" | "left";
  format?: (value: number) => string;
}

export interface Data {
  IDTransaccion: string;
  Fecha: string;
  Referencia: string;
  CuentaOrigen: string;
  AgenciaVinculado: string;
  Monto: number;
  Tipo: string;
}
