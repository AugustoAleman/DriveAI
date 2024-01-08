import React from "react";
import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import CircularProgress from '@mui/material/CircularProgress';
import { Data, Column } from "./types";
import { useMediaQuery } from "@mui/material";
import { getComissionLog } from "services";

const columns: readonly Column[] = [
  { id: "timestamp", label: "Fecha", minWidth: 80 },
  {
    id: "carCommission",
    label: "Comisión por auto en plataforma",
    minWidth: 144,
    format: (value: number) => value.toLocaleString("es-MX", {
      style: "currency",
      currency: "MXN",
    }),
  },
  {
    id: "registerCommission",
    label: "Comisión por registro",
    minWidth: 144,
    format: (value: number) => value.toLocaleString("es-MX", {
      style: "currency",
      currency: "MXN",
    }),
  },
  {
    id: "saleCommission",
    label: "Comisión por venta",
    minWidth: 144,
    format: (value: number) => value.toLocaleString("es-MX", {
      style: "currency",
      currency: "MXN",
    }),
  },
  {
    id: "subscriptionPriceFree",
    label: "Suscripción Gratis",
    minWidth: 144,
    format: (value: number) => value.toLocaleString("es-MX", {
      style: "currency",
      currency: "MXN",
    }),
  },
  {
    id: "subscriptionPricePlus",
    label: "Suscripción Plus",
    minWidth: 144,
    format: (value: number) => value.toLocaleString("es-MX", {
      style: "currency",
      currency: "MXN",
    }),
  },
  {
    id: "subscriptionPricePro",
    label: "Suscripción Pro",
    minWidth: 144,
    format: (value: number) => value.toLocaleString("es-MX", {
      style: "currency",
      currency: "MXN",
    }),
  },
  {
    id: "subscriptionPriceEnterprise",
    label: "Suscripción Enterprise",
    minWidth: 144,
    format: (value: number) => value.toLocaleString("es-MX", {
      style: "currency",
      currency: "MXN",
    }),
  },
];



const PricesHistoryTable = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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

  const [loading, setLoading] = useState(true);

  const [comissionsInfo, setComissionsInfo] = React.useState<Data[]>([]);
  
  const getComissionLogInfo = async () => {
    try {
      const response = await getComissionLog();
      const formattedData = response.map((request: any) => {
        const timestamp = request.timestamp.split("T")[0];
        return { ...request, timestamp };
      });
      setComissionsInfo(formattedData);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getComissionLogInfo();
  }, []);  

  console.log("Comissions logs info: ", comissionsInfo);

  return (
    <Paper
      sx={{
        width: isSmallScreen ? "90%" : "85%",
        marginLeft: isSmallScreen ? "2.5rem" : "7rem",
      }}
    >
      <TableContainer sx={{ maxHeight: 650 }}>
      {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
                <CircularProgress />
              </div>
            ) : (
        <Table stickyHeader aria-label="sticky table">
          <TableHead style={{ background: "grey" }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align="center" // Align center for table header cells
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
            {comissionsInfo
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.carCommission}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align="center" // Align center for table cells
                        >
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      )}
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[0]}
        component="div"
        count={comissionsInfo.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default PricesHistoryTable;
