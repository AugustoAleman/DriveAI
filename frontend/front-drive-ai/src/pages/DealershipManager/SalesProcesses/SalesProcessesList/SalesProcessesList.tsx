import * as React from "react";
import { PageBackground } from "./styles";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useMediaQuery } from "@mui/material";
import { Data, Column } from "./types";
import CircularProgress from "@mui/material/CircularProgress";
import { useState, useEffect } from "react";
import { getSalesProcess } from "services";

const columns: readonly Column[] = [
  { id: "idVenta", label: "ID de venta", minWidth: 40, align: "center" },
  { id: "vendedor", label: "Vendedor", minWidth: 100, align: "center" },
  { id: "cliente", label: "Cliente", minWidth: 100, align: "center" },
  {
    id: "fechaInicio",
    label: "Fecha de inicio",
    minWidth: 100,
    align: "center",
  },
  { id: "estado", label: "Estado", minWidth: 100, align: "center" },
  // align: 'right',
  // format: (value: string) => value.toFixed(2),
];

function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState<Data[]>([]);
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

  const isSmallScreen = useMediaQuery("(max-width: 1440px)");

  function getStatusCell(column: Column, value: any) {
    if (column.id === "estado") {
      if (value === "Paid") {
        return (
          <div
            style={{
              color: "#09CD40",
              height: "100%",
              width: "100%",
              fontWeight: "bold",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Completada
          </div>
        );
      } else if (value === "Pending") {
        return (
          <div
            style={{
              color: "#fc9917",
              height: "100%",
              width: "100%",
              fontWeight: "bold",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            En proceso
          </div>
        );
      } else if (value === "Inactive") {
        return (
          <div
            style={{
              color: "red",
              height: "100%",
              width: "100%",
              fontWeight: "bold",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Inactiva
          </div>
        );
      } else if (value === "Closed") {
        return (
          <div
            style={{
              color: "grey",
              height: "100%",
              width: "100%",
              fontWeight: "bold",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Cerrada
          </div>
        );
      }
    } else {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {value}
        </div>
      );
    }
  }

  const getDataTable = async () => {
    try {
      const res = await getSalesProcess();
      if (res && res.data) {
        const responsesFormatted = res.data.map((response: any) => {
          response.fechaInicio = response.fechaInicio.split(" ")[0]; // Assign the formatted value back to the property
          return response;
        });
        setRows(responsesFormatted);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    getDataTable();
  }, []);

  return (
    <Paper
      sx={{
        width: isSmallScreen ? "90%" : "90%",
        marginLeft: isSmallScreen ? "2.5rem" : "7rem",
      }}
    >
      <TableContainer sx={{ maxHeight: 650 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead style={{ background: "grey" }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align="center"
                  style={{
                    minWidth: column.minWidth,
                    fontWeight: "bold",
                    background: "#b3b3b3",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  No se encuentran datos
                </TableCell>
              </TableRow>
            ) : (
              rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.idVenta}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align="center"
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.format && typeof value === "number"
                            ? column.format(value as number)
                            : getStatusCell(column, value)}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

const SalesProcessesList = () => {
  return (
    <>
      <PageBackground>
        <StickyHeadTable />
      </PageBackground>
    </>
  );
};

export default SalesProcessesList;
