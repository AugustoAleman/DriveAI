import { useState, useEffect, useMemo } from "react";

// Importing custom styles
import { PageBackground, Container, Add } from "./styles";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Data } from "./types";
import { Button } from "components/Button";

import { getBankAccounts } from "services";

import { GenericModal } from "components/GenericModal";

import { IconButton } from "components/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import {
	ModalContainer,
	ModalFieldsNames,
	ModalHeader,
	ModalRow,
	ButtonContainer,
} from "./styles";

interface AddBankModalProps {
	isOpen: boolean;
	closeModal: () => void;
}

function AddBankModal({ isOpen, closeModal }: AddBankModalProps): JSX.Element {
	return (
		<GenericModal
			open={isOpen}
			handleClose={closeModal}
			handleOnSave={() => {}}
		>
			<ModalContainer>
				<ModalHeader>
					<h1>Añadir cuenta bancaria</h1>
				</ModalHeader>

				<ModalFieldsNames>
					<h4>Número de cuenta</h4>
					<h4>Agencia</h4>
				</ModalFieldsNames>

				<ModalRow>
					<input type="text" />
					<select>
						{/*Endpoint to get all agencies associated with current admin's id*/}
						<option value="1">Agencia 1</option>
						<option value="2">Agencia 2</option>
						<option value="3">Agencia 3</option>
					</select>
				</ModalRow>

				<ModalFieldsNames>
					<h4>Banco</h4>
				</ModalFieldsNames>

				<ModalRow>
					<input type="text" />
				</ModalRow>

				<ModalFieldsNames>
					<h4>Clave interbancaria</h4>
				</ModalFieldsNames>

				<ModalRow>
					<input type="text" />
				</ModalRow>

				<ButtonContainer>
					<Button onClick={() => {}} width="6rem" fontWeight="400">
						Guardar
					</Button>
				</ButtonContainer>
			</ModalContainer>
		</GenericModal>
	);
}

const ManagerBankAccountsManagementPredecessor = () => {
	const [rows, setRows] = useState<Data[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [openModal, setOpenModal] = useState(false);

	function getColorForStatus(status: string) {
		switch (status) {
			case "Active":
				return "green";
			case "Pending":
				return "#fc9917";
			case "Closed":
				return "red";
			default:
				return "black";
		}
	}

	const columns: GridColDef[] = useMemo(
		() => [
			{
				field: "NumeroCuenta",
				headerName: "Número de cuenta",
				width: 200,
				align: "center", // Align to the center
				headerAlign: "center",
				editable: false,
			},
			{
				field: "AgenciaVinculado",
				headerName: "Agencia vinculada",
				width: 240,
				align: "center", // Align to the center
				headerAlign: "center",
				editable: false,
			},
			{
				field: "Banco",
				headerName: "Banco",
				width: 240,
				align: "center", // Align to the center
				headerAlign: "center",
				editable: false,
			},
			{
				field: "ClaveInterbancaria",
				headerName: "Clabe interbancaria",
				width: 300,
				align: "center", // Align to the center
				headerAlign: "center",
				editable: false,
			},
			{
				field: "FechaModificacion",
				headerName: "Fecha de modificación",
				width: 190,
				align: "center", // Align to the center
				headerAlign: "center",
				editable: false,
			},
			{
				field: "Estatus",
				headerName: "Estado",
				width: 150,
				align: "center", // Align to the center
				headerAlign: "center",
				renderCell: (params) => (
					<span
						style={{
							fontWeight: 800,
							color: getColorForStatus(params.value),
							padding: 0,
						}}
					>
						{params.value}
					</span>
				),
				editable: false,
			},
		],
		[]
	);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true);
				// const response = await getDealershipAdministration();
				const response = await getBankAccounts();
				setRows(response.data);
			} catch (error) {
				console.log("Error fetching data: ", error);
			} finally {
				setIsLoading(false);
			}
		};

		if (isLoading) {
			fetchData();
		}
	}, []);

	return (
		<PageBackground>
			<Container>
				<DataGrid
					initialState={{
						pagination: { paginationModel: { pageSize: 6 } },
					}}
					rows={rows}
					columns={columns}
					getRowId={(row) => row.NumeroCuenta}
					sx={{
						backgroundColor: "transparent",

						"& .MuiDataGrid-cell:focus-within": {
							outline: "none",
						},

						// only paint data grid rows white and leave header as is
						"& .MuiDataGrid-row": {
							backgroundColor: "white",
						},

						// only paint data grid header bold
						"& .MuiDataGrid-columnHeaderTitle": {
							fontWeight: "bold",
						},

						// paint data grid header backgroundColor
						"& .MuiDataGrid-columnHeader": {
							backgroundColor: "#b3b3b3",
						},

						// paint border of the data grid
						borderColor: "transparent",

						// Move the virtual scroller to the right
						"& .MuiDataGrid-virtualScroller": {
							overflowY: "auto",

							"&::-webkit-scrollbar": {
								marginRight: "0.5rem",
							},
						},
					}}
				/>
			</Container>

			<Add>
				<IconButton onClick={() => setOpenModal(true)}>
					<AddCircleOutlineIcon
						style={{
							fontSize: "2.5rem",
							top: "0.4rem",
							color: "#000000",
						}}
					/>
				</IconButton>
			</Add>

			<AddBankModal
				isOpen={openModal}
				closeModal={() => setOpenModal(false)}
			/>
		</PageBackground>
	);
};

export default ManagerBankAccountsManagementPredecessor;
