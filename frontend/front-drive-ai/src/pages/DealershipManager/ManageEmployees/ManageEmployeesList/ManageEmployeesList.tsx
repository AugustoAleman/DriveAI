// Import react hooks and others
import React, { useState, useEffect } from "react";

// Import MUI table
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

// My components
import Button from "@mui/material/Button";
import { IconButton } from "components/IconButton";
import { GenericModal } from "components/GenericModal";
import Alert from "@mui/material/Alert";

// MUI componentes
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { getAgencyManager, createSalesman, listAllUsers } from "services";
// My styles
import {
	PageBackground,
	ModalContainer,
	ModalFieldsNames,
	ModalHeader,
	ModalRow,
	ButtonContainer,
} from "./styles";

import { useMediaQuery } from "@mui/material";

import { Column, Data } from "./types";
import { useAppContext } from "store/app-context/app-context";

const columns: readonly Column[] = [
	{ id: "id", label: "ID", minWidth: 40, align: "center" },
	{ id: "name", label: "Nombre", minWidth: 100, align: "center" },
	{ id: "email", label: "Email", minWidth: 100, align: "center" },
	{
		id: "createdAt",
		label: "Fecha de registro",
		minWidth: 100,
		align: "center",
	},
	{ id: "deletedAt", label: "Estado", minWidth: 100, align: "center" },
];

function generateReport(employee_id: string) {
	console.log("Generating report for employee: " + employee_id);
}

function createData(
	employee_id: string,
	name: string,
	reg_date: string,
	status_code: number
): Data {
	const sales_button = (employee_id: string) => {
		return (
			<Button
				variant="text"
				sx={{
					color: "#4251F5",
					fontSize: "0.6rem",
					fontWeight: "bold",
				}}
				onClick={() => generateReport(employee_id)}
			>
				Reporte
			</Button>
		);
	};

	let sales = sales_button(employee_id);

	let status: string;

	if (status_code === 0) {
		status = "Activa";
	} else if (status_code === 1) {
		status = "En proceso";
	} else {
		status = "Inactiva";
	}

	return { employee_id, name, sales, reg_date, status };
}

function StickyHeadTable() {
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [response, setResponse] = useState<any[]>([]);

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
		if (column.id !== "deletedAt") {
			return value;
		}

		if (value === null) {
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
		} else {
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
	}

	const getAllUsers = async () => {
		try {
			const res = await listAllUsers();
			if (res && res.data) {
				console.log(res);

				const filteredUsers = res.data.filter(
					(user: any) => user.user_type === "SALESMAN"
				);

				filteredUsers.forEach((user: any) => {
					user.createdAt = user.createdAt.split("T")[0];
				});

				setResponse(filteredUsers);
			}
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getAllUsers();
	}, []);

	const isSmallScreen = useMediaQuery("(max-width: 1440px)");

	return (
		<Paper
			sx={{
				width: isSmallScreen ? "90%" : "90%",
				marginLeft: isSmallScreen ? "2.5rem" : "6rem",
				marginTop: isSmallScreen ? "1rem" : "1rem",
			}}
		>
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
					<TableBody>
						{response
							.slice(
								page * rowsPerPage,
								page * rowsPerPage + rowsPerPage
							)
							.map((row: any) => (
								<TableRow
									hover
									role="checkbox"
									tabIndex={-1}
									key={row.Id}
								>
									{columns.map((column) => {
										const value = row[column.id];
										return (
											<TableCell
												key={column.id}
												align={column.align}
											>
												{column.format &&
												typeof value === "number"
													? column.format(value)
													: getStatusCell(
															column,
															value
													  )}
											</TableCell>
										);
									})}
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[0]}
				component="div"
				count={response.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Paper>
	);
}

const ManageEmployeesList = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [email, setEmail] = useState("");
	const [agencia, setAgencia] = useState(0);
	const [apellido, setApellido] = useState("");
	const [nombre, setNombre] = useState("");
	const [arregloAgencias, setArregloAgencias] = useState<any[]>([]);
	const [carga, setCarga] = useState(false);
	const [mostrarAlerta, setMostrarAlerta] = useState(false);

	function openModal() {
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}

	const ModalObject = {
		email: email,
		surname: apellido,
		name: nombre,
		user_type: "SALESMAN",
		cellphone: "5555555555",
		telephone: "5555555555",
		dateOfBirth: "2001-01-26T06:00:00.000+00:00",
		password: "Password1",
		dealershipsIds: [agencia],
	};

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
		nombre: string
	) => {
		switch (nombre) {
			case "email":
				setEmail(event.target.value);
				console.log(event.target.value);
				break;
			case "agencia":
				setAgencia(parseInt(event.target.value));
				console.log("Agencia seleccionada", event.target.value);
				break;
			case "apellido":
				setApellido(event.target.value);
				console.log(event.target.value);
				break;
			case "nombre":
				setNombre(event.target.value);
				console.log(event.target.value);
				break;
		}
	};

	const appContext = useAppContext();

	const getAgencyFromManager = async () => {
		try {
			console.log("Id manager:", appContext.user?.id?.toString());
			const res = await getAgencyManager(appContext.user?.id?.toString());
			if (res && res.data) {
				console.log("Agencias:", res.data);
				setArregloAgencias(res.data);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	const validateEmail = (email: string): boolean => {
		return emailRegex.test(email);
	};

	const saveEmployee = async () => {
		if (validateEmail(email) === true) {
			try {
				const res = await createSalesman(ModalObject);
				console.log(res);
				closeModal();
				setCarga(true);
			} catch (err) {
				console.log(err);
			}
		} else {
			setMostrarAlerta(true);
		}
	};

	useEffect(() => {
		getAgencyFromManager();
	}, []);

	return (
		<>
			<PageBackground>
				<StickyHeadTable />
				<IconButton onClick={openModal}>
					<AddCircleOutlineIcon
						style={{
							fontSize: "2.5rem",
							top: "0.4rem",
							color: "#000000",
						}}
					/>
				</IconButton>

				<GenericModal
					open={isOpen}
					handleClose={closeModal}
					handleOnSave={() => {}}
				>
					<ModalContainer>
						<ModalHeader>
							<h1>Añadir nuevo vendedor</h1>
						</ModalHeader>

						<ModalFieldsNames>
							<h4>Nombre</h4>
							<h4>Agencia</h4>
						</ModalFieldsNames>

						<ModalRow>
							<input
								type="text"
								onChange={(e) => handleChange(e, "nombre")}
							/>
							<select
								onChange={(e) => handleChange(e, "agencia")}
							>
								{arregloAgencias.map((agencias: any) => (
									<option
										value={agencias.id}
										key={agencias.id}
									>
										{agencias.name}
									</option>
								))}
							</select>
						</ModalRow>

						<ModalFieldsNames>
							<h4>Apellido</h4>
						</ModalFieldsNames>

						<ModalRow>
							<input
								type="text"
								onChange={(e) => handleChange(e, "apellido")}
							/>
						</ModalRow>

						<ModalFieldsNames>
							<h4>Correo electrónico</h4>
						</ModalFieldsNames>

						<ModalRow>
							<input
								type="text"
								onChange={(e) => handleChange(e, "email")}
							/>
							{mostrarAlerta && (
								<Alert severity="warning">
									El correo no es valido
								</Alert>
							)}
						</ModalRow>

						<ButtonContainer>
							<Button
								variant="text"
								sx={{
									width: "6rem",
									fontSize: "0.8rem",
								}}
								onClick={() => {
									saveEmployee();
								}}
							>
								Guardar
							</Button>
						</ButtonContainer>
					</ModalContainer>
				</GenericModal>
			</PageBackground>
		</>
	);
};

export default ManageEmployeesList;
