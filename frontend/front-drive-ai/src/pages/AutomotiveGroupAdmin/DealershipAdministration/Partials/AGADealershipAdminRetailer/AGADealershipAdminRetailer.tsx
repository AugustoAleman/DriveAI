import * as React from "react";
import { PageBackground, useStyles } from "./styles";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Typography } from "@material-ui/core";
import { SelectChangeEvent } from "@mui/material/Select";
import { Data, Column } from "./types";
import { useMediaQuery } from "@mui/material";
import { getAdministration } from "services/User-ms/AGA/getAdministration";
import { useAppContext } from "store/app-context/app-context";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const columns: readonly Column[] = [
  {
    id: "retailer_name",
    label: "Nombre vendedor",
    minWidth: 100,
    align: "center",
  },
  {
    id: "registration_date",
    label: "Fecha de registro",
    minWidth: 150,
    align: "center",
  },
  {
    id: "supervisor",
    label: "Supervisor",
    minWidth: 100,
    align: "center",
  },
  {
    id: "id",
    label: "ID",
    minWidth: 100,
    align: "center",
  },
  { id: "status", label: "Estatus", minWidth: 100, align: "center" },
];

function createData(
  retailer_name: string,
  registration_date: string,
  supervisor: string,
  id: string,
  status_code: number,
  assignedDealership: string
): Data {
  let status: string;
  if (status_code === 0) {
    status = "Activa";
  } else if (status_code === 1) {
    status = "En proceso";
  } else {
    status = "Inactiva";
  }

  const formattedDate = new Date(registration_date).toLocaleDateString(
    "es-MX",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return {
    retailer_name,
    registration_date: formattedDate,
    supervisor,
    id,
    status,
    assignedDealership,
  };
}

function StickyHeadTable({ rows }: { rows: Data[] }) {
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

  function getStatusCell(column: Column, value: any) {
    if (column.id === "status") {
      if (value === "Activa") {
        return (
          <div
            style={{
              color: "#09CD40",
              height: "100%",
              width: "100%",
              fontWeight: "bold",
            }}
          >
            Activa
          </div>
        );
      } else if (value === "En proceso") {
        return (
          <div
            style={{
              color: "#fc9917",
              height: "100%",
              width: "100%",
              fontWeight: "bold",
            }}
          >
            En proceso
          </div>
        );
      } else if (value === "Inactiva") {
        return (
          <div
            style={{
              color: "red",
              height: "100%",
              width: "100%",
              fontWeight: "bold",
            }}
          >
            Inactiva
          </div>
        );
      }
    } else {
      return value;
    }
  }

  interface DividerRowProps {
    title: string;
  }

  const DividerRow: React.FC<DividerRowProps> = ({ title }) => (
    <TableRow>
      <TableCell
        style={{
          paddingLeft: "24px",
          borderBottom: "3px solid blue",
          borderBottomColor: "#111D4E",
        }}
        colSpan={columns.length}
      >
        <Typography
          variant="subtitle1"
          component="div"
          style={{ fontWeight: "bold" }}
        >
          {title}
        </Typography>
      </TableCell>
    </TableRow>
  );

  const isSmallScreen = useMediaQuery("(max-width: 1440px)");

  return (
    <Paper
      sx={{
        width: isSmallScreen ? "90%" : "90%",
        marginLeft: isSmallScreen ? "2.5rem" : "2.5rem",
      }}
    >
      <TableContainer sx={{ maxHeight: 650 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead style={{ backgroundColor: "#b3b3b3" }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
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
            {rows.reduce((accumulator, row, rowIndex, array) => {
              const isDifferentGroup =
                rowIndex === 0 ||
                row.assignedDealership !==
                  array[rowIndex - 1].assignedDealership;
              if (isDifferentGroup) {
                accumulator.push(
                  <DividerRow title={`Group ${row.assignedDealership}`} />
                );
              }

              accumulator.push(
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: 190 }}
                      >
                        {column.format && typeof value === "number"
                          ? column.format(value as number)
                          : getStatusCell(column, value)}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );

              return accumulator;
            }, [] as JSX.Element[])}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[0]}
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

const options = [
  {
    value: 1,
    label: "Fecha",
  },
  {
    value: 2,
    label: "Agencia",
  },
  {
    value: 3,
    label: "Estatus",
  },
];

function FilterButton() {
  const [filter, setFilter] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value);
  };

  const [selectedPlan, setSelectedPlan] = useState(options[0]);

  const handlePlanChange = (event: any, newValue: any) => {
    setSelectedPlan(newValue);
  };

  return (
    <Autocomplete
      id="Fist filter"
      options={options}
      getOptionLabel={(option) => option.label}
      onChange={handlePlanChange}
      renderInput={(params) => (
        <TextField
          {...params}
          color="primary"
          label="Filter"
          sx={{ width: "185px", marginBottom: "14px" }}
        />
      )}
    />
  );
}

const AGADealershipAdminRetailer = () => {
  const classes = useStyles();
  const appContext = useAppContext();
  const userId = appContext?.user?.id || 0;

  const [rows, setRows] = useState<Data[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await getAdministration(userId, "salesmen");

        const newRows = response.data
          .sort((a: any, b: any) => {
            if (a.assignedDealership < b.assignedDealership) return -1;
            if (a.assignedDealership > b.assignedDealership) return 1;
            return 0;
          })
          .map((salesmen: any) => {
            return createData(
              salesmen.name,
              salesmen.date,
              salesmen.assignedManager,
              salesmen.id,
              salesmen.status,
              salesmen.assignedDealership
            );
          });

        setRows(newRows);
      } catch (error) {
        console.log("Error fetching data: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <PageBackground>
      <StickyHeadTable rows={rows} />
    </PageBackground>
  );
};

export default AGADealershipAdminRetailer;
