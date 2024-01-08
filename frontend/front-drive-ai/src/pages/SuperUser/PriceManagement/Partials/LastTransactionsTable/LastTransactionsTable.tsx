import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import CircularProgress from "@mui/material/CircularProgress";
// Agrega la importación necesaria para getLastTransactions
import { getLastTransactions } from "services";
import { getLastTransactionsOfTheSystem } from "services";

interface Column {
  id: "id" | "fecha" | "referencia" | "cuentaOrigen" | "monto" | "tipo";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "id", label: "Id. de transacción", minWidth: 80 },
  { id: "fecha", label: "Fecha", minWidth: 144 },
  {
    id: "referencia",
    label: "Referencia",
    minWidth: 144,
  },
  {
    id: "cuentaOrigen",
    label: "Cuenta origen",
    minWidth: 144,
  },
  {
    id: "monto",
    label: "Monto",
    minWidth: 144,
    format: (value: number) =>
      value.toLocaleString("es-MX", {
        style: "currency",
        currency: "MXN",
        minimumFractionDigits: 2,
      }),
  },
  {
    id: "tipo",
    label: "Tipo",
    minWidth: 144,
  },
];

const LastTransactionsTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [customerInfo, setCustomerInfo] = useState<any[]>([]); // Corrige el nombre de la variable
  const [loading, setLoading] = useState(true);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getTableInfo = async () => {
    try {
      const res = await getLastTransactionsOfTheSystem();
      const formattedData = res.map((transaction: any) => {
        const fecha = transaction.fecha.split(" ")[0];
        return { ...transaction, fecha };
      });

      setCustomerInfo(formattedData);
      setLoading(false);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTableInfo();
  }, []);

  console.log("The customer info is: ", customerInfo);

  return (
    <Paper sx={{ width: "88%", overflow: "hidden", marginLeft: "54px" }}>
      <TableContainer sx={{ maxHeight: 650 }}>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100px",
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <Table stickyHeader aria-label="sticky table">
            <TableHead style={{ background: "grey" }}>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align="center" // Corrige esta línea
                    sx={{
                      minWidth: column.minWidth,
                      fontWeight: "bold",
                      background: "#CBD0D0",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {customerInfo
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => (
                      <TableCell key={column.id} align="center">
                        {" "}
                        {/* Añade align="center" */}
                        {column.format && typeof row[column.id] === "number"
                          ? column.format(row[column.id])
                          : row[column.id]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]} // Agrega opciones de número de filas por página
        component="div"
        count={customerInfo.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default LastTransactionsTable;
