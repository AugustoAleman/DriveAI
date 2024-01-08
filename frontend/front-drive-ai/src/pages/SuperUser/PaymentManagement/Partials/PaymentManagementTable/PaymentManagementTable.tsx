import * as React from "react";
import { useState, useEffect } from "react";
import { useStyles, PageBody, ModalData, ModalTitle, ModalDivder,
      Active, Progess, Inactive } from "./styles";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Grid, Typography } from "@material-ui/core";
import { Button } from "components/Button";
import { Data, Column, DividerRowProps } from "./types";
import { useMediaQuery } from "@mui/material";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from "@mui/material/TextField";
import CircularProgress from '@mui/material/CircularProgress';
import { getDealershipAdministration } from "services";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const columns: readonly Column[] = [
  {
    id: "accountNumber",
    label: "Numero de cuenta",
    minWidth: 100,
    align: "center",
  },
  {
    id: "name",
    label: "Agencia vinculada",
    minWidth: 150,
    align: "center",
  },
  { id: "bank", label: "Banco", minWidth: 80, align: "center" },
  {
    id: "interbankClabe",
    label: "Clave interbancaria",
    minWidth: 150,
    align: "center",
  },
  {
    id: "modifiedDate",
    label: "Fecha de modificacion",
    minWidth: 150,
    align: "center",
  },
  { id: "status", label: "Estatus", minWidth: 50, align: "center" },
  { id: "details", label: "", minWidth: 80, align: "center" },
];

function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);

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

function BasicModal({ rowData }: { rowData: Data }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        color="#4251F5"
        fontSize="0.6rem"
        fontWeight="bold"
        onClick={handleOpen}
        variant="text"
      >
        Ver detalles
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {rowData.name}
          </Typography>
          <table>
            <tr>
              <ModalTitle> Agencia </ModalTitle>
              <ModalData> {rowData.name} </ModalData>
            </tr>
            <ModalDivder></ModalDivder>

            <tr>
              <ModalTitle> Numero de cuenta </ModalTitle>
              <ModalData> {rowData.accountNumber} </ModalData>
            </tr>
            <ModalDivder></ModalDivder>

            <tr>
              <ModalTitle> Banco </ModalTitle>
              <ModalData> {rowData.bank} </ModalData>
            </tr>
            <ModalDivder></ModalDivder>

            <tr>
              <ModalTitle> Clave interbancaria </ModalTitle>
              <ModalData> {rowData.interbankClabe} </ModalData>
            </tr>
            <ModalDivder></ModalDivder>

            <tr>
              <ModalTitle> Fecha de modificación </ModalTitle>
              <ModalData> {rowData.modifiedDate} </ModalData>
            </tr>
            <ModalDivder></ModalDivder>

            <tr>
              <ModalTitle> Estatus </ModalTitle>
              <ModalData> {rowData.status} </ModalData>
            </tr>
            <ModalDivder></ModalDivder>

          </table>
        </Box>
      </Modal>
    </div>
  );
}

function nothing() {}

function getStatusCell(column: Column, value: any, row: Data) {
  if (column.id === "status") {
    if (value === "Active") {
      return (
        <Active>
          Activa
        </Active>
      );
    } else if (value === "En proceso") {
      return (
        <Progess>
          En proceso
        </Progess>
      );
    } else if (value === "Inactiva") {
      return (
        <Inactive>
          Inactiva
        </Inactive>
      );
    }
  } else {
    return value;
  }
}

  const dividerRowCount = 3;

  const DividerRow: React.FC<DividerRowProps> = ({ title, index }) => {
    let divider = title.length > 0 ? title[index].name : "";

    return (
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
            {divider}
          </Typography>
        </TableCell>
      </TableRow>
    );
  };

  const [loading, setLoading] = useState(true);

  const [dealershipAdministrationData, setDealershipAdministrationData] =
    React.useState<Data[]>([]);

  const getDataTable = async () => {
    try {
      const response = await getDealershipAdministration();
     const formattedData = response.data.map((item: any) => ({
        accountNumber: item.dealershipBankAccount.accountNumber.toString(),
        name: item.dealershipName.name,
        bank: item.dealershipBankAccount.bank,
        interbankClabe: item.dealershipBankAccount.interbankClabe,
        modifiedDate: item.dealershipBankAccount.modifiedDate.split(" ")[0],
        status: item.dealershipBankAccount.status,
        details: "", // Debes ajustar esta propiedad según tus necesidades
      }));
      setDealershipAdministrationData(formattedData);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDataTable();
  }, []);

  console.log("Table: ", dealershipAdministrationData);

  return (
    <Paper sx={{
        width: isSmallScreen ? "90%" : "85%",
        marginLeft: isSmallScreen ? "2.5rem" : "7rem",
        marginTop: "2rem",
        marginBottom: "2rem",
      }}>
      <TableContainer sx={{ maxHeight: 650 }}>
      {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
                <CircularProgress />
              </div>
            ) : (
        <Table stickyHeader aria-label="sticky table">
          <TableHead style={{ backgroundColor: "grey" }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
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
            {dealershipAdministrationData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, rowIndex) => {
                const isDividerRow = (rowIndex + 1) % dividerRowCount === 0;
                return (
                  <>
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.interbankClabe}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            sx={{ minWidth: 14 }}
                          >
                            {column.format && typeof value === "number"
                              ? column.format(value as number)
                              : getStatusCell(column, value, row)}
                            {column.id === "details" && (
                              <BasicModal rowData={row} />
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  </>
                );
              })}
          </TableBody>
        </Table>
      )}
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[0]}
        component="div"
        count={dealershipAdministrationData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

const filter = [
  {
    value: "F",
    label: "Fecha",
  },
  {
    value: "A",
    label: "Agencia",
  },
  {
    value: "E",
    label: "Esatus",
  },
];

function FilterButton() {

  const [selectedPlan, setSelectedPlan] = useState(filter[0]);

  const handlePlanChange = (event:any, newValue:any) => {
    setSelectedPlan(newValue);
  };

  return (
    <Autocomplete
    id="Fist filter"
    options={filter}
    getOptionLabel={(option) => option.label}
    onChange={handlePlanChange}
    renderInput={(params) => (
      <TextField
        {...params}
        color="primary"
        sx={{ width: '115px', marginBottom: "14px" }}
      />
    )}
    />
  );
}

const PaymentManagementTable = () => {
  const classes = useStyles();

  return (
    <PageBody>
      <Grid container alignItems="center" className={classes.actionContainer}>
        <Grid item className={classes.filterContainer}>
        </Grid>
      </Grid>
      <StickyHeadTable />
    </PageBody>
  );
};

export default PaymentManagementTable;
