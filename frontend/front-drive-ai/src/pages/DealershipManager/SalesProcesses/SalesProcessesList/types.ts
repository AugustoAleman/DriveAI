export interface Column {
  id: "idVenta" | "vendedor" | "cliente" | "fechaInicio" | "estado";
  label: string;
  minWidth?: number;
  align?: "right" | "center" | "left";
  format?: (value: number) => string;
}

export interface Data {
  idVenta: string;
  vendedor: string;
  cliente: string;
  fechaInicio: string;
  estado: string;
}
