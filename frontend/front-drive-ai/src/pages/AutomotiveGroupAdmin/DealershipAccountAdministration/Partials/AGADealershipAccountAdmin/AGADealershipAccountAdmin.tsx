import * as React from "react";
import { useState, useEffect } from "react";
import { PageBackground, useStyles } from "./styles";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Box, Grid } from "@material-ui/core";
import { Column } from "./types";
import { getDealershipAdministration } from "services";
import { Data } from "./types";
import CircularProgress from "@mui/material/CircularProgress";
import { ModalAddAccount } from "./ModalAddAccount";

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
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [dealershipAdministrationData, setDealershipAdministrationData] =
		React.useState<Data[]>([]);
	const [loading, setLoading] = React.useState<boolean>(true);
	//Modal
	const [openModal, setOpenModal] = useState(false);
	const [selectedDealershipId, setSelectedDealershipId] = useState<
		number | null
	>(null);
	const [selectedDealershipName, setSelectedDealershipName] = useState<
		string | null
	>(null);
	const [selectedDealershipBankAccount, setSelectedDealershipBankAccount] =
		useState<string | null>(null);
	const [interbankcode, setinterbankcode] = useState<string | null>(null);
	const [modifiedDate, setModifiedDate] = useState<string | null>(null);
	const [status, setStatus] = useState<string | null>(null);

	const getDataTable = async () => {
		try {
			const response = await getDealershipAdministration();
			const formattedData = response.data.map((item: any) => ({
				accountNumber:
					item.dealershipBankAccount.accountNumber.toString(),
				name: item.dealershipName.name,
				bank: item.dealershipBankAccount.bank,
				interbankClabe: item.dealershipBankAccount.interbankClabe,
				modifiedDate:
					item.dealershipBankAccount.modifiedDate.split(" ")[0],
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

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	function getDetailsLink(column: Column, value: any, row: Data) {
		if (column.id !== "details") {
			return value;
		}

		return (
			<a
				href="#"
				onClick={() => {
					setSelectedDealershipId(Number(row.accountNumber));
					setSelectedDealershipName(row.name);
					setSelectedDealershipBankAccount(row.bank);
					setinterbankcode(row.interbankClabe);
					setModifiedDate(row.modifiedDate);
					setStatus(row.status);
					setOpenModal(true);
					console.log(
						"Editar agencia seleccionada id: ",
						row.accountNumber
					);
				}}
				style={{ color: "#3F51B5", textDecoration: "none" }}
			>
				Más detalles
			</a>
		);
	}

	function getStatusCell(column: Column, value: any, row: Data) {
		if (column.id === "status") {
			if (value === "Active") {
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
		} else if (column.id === "details") {
			return getDetailsLink(column, value, row);
		} else {
			return value;
		}
	}

	return (
		<>
			<Paper sx={{ width: "97%", position: "relative" }}>
				<TableContainer sx={{ maxHeight: 650 }}>
					<Table stickyHeader aria-label="sticky table">
						<TableHead style={{ background: "grey" }}>
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
						{loading ? (
							<TableRow>
								<TableCell colSpan={7} align="center">
									<CircularProgress />
								</TableCell>
							</TableRow>
						) : dealershipAdministrationData.length === 0 ? (
							<TableRow>
								<TableCell colSpan={7} align="center">
									No hay datos para mostrar
								</TableCell>
							</TableRow>
						) : (
							<TableBody>
								{dealershipAdministrationData
									.slice(
										page * rowsPerPage,
										page * rowsPerPage + rowsPerPage
									)
									.map((row: any) => (
										<TableRow
											hover
											role="checkbox"
											tabIndex={-1}
											key={row.accountNumber}
										>
											{columns.map((column) => {
												const value = row[column.id];
												return (
													<TableCell
														key={column.id}
														align={column.align}
														style={{
															minWidth: 190,
														}}
													>
														{column.format &&
														typeof value ===
															"number"
															? column.format(
																	value
															  )
															: getStatusCell(
																	column,
																	value,
																	row
															  )}
													</TableCell>
												);
											})}
										</TableRow>
									))}
							</TableBody>
						)}
					</Table>
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
			{selectedDealershipId && (
				<ModalAddAccount
					open={openModal}
					handleClose={() => setOpenModal(false)}
					dealershipId={selectedDealershipId}
					dealershipName={selectedDealershipName}
					dealershipBankAccount={selectedDealershipBankAccount}
					interbankClabe={interbankcode}
					modifiedDate={modifiedDate}
					status={status}
				/>
			)}
		</>
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

const AGADealershipAccountAdmin = () => {
	const classes = useStyles();

	return (
		<>
			<PageBackground>
				<Grid container justifyContent="center">
					<Grid item xs={12}>
						<Box sx={{ maxWidth: "100%", overflow: "auto" }}>
							<StickyHeadTable />
						</Box>
					</Grid>
				</Grid>
			</PageBackground>
		</>
	);
};

export default AGADealershipAccountAdmin;
