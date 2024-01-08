import { useState, useEffect, useMemo } from "react";

// Importing custom styles
import { PageBackground } from "./styles";
import { ModalAddAccount } from "./ModalAddAccount";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Data } from "./types";
import { Button } from "@mui/material";

import { getDealershipAdministration } from "services";

const BankAccountsList = () => {
	const [rows, setRows] = useState<Data[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [openModal, setOpenModal] = useState(false);

	const [dealershipId, setDealershipId] = useState<number>(0);
	const [dealershipName, setDealershipName] = useState<string>("0");
	const [dealershipBankAccount, setDealershipBankAccount] =
		useState<string>("");
	const [interbankClabe, setInterbankClabe] = useState<string>("");
	const [modifiedDate, setModifiedDate] = useState<string>("");
	const [status, setStatus] = useState<string>("");

	function getColorForStatus(status: string) {
		switch (status) {
			case "Active":
				return "green";
			case "In process":
				return "#fc9917";
			case "Inactive":
				return "red";
			default:
				return "black";
		}
	}

	const columns: GridColDef[] = useMemo(
		() => [
			{
				field: "accountNumber",
				headerName: "Número de cuenta",
				width: 200,
				align: "center", // Align to the center
				headerAlign: "center",
				editable: false,
			},
			{
				field: "name",
				headerName: "Agencia vinculada",
				width: 240,
				align: "center", // Align to the center
				headerAlign: "center",
				editable: false,
			},
			{
				field: "bank",
				headerName: "Banco",
				width: 240,
				align: "center", // Align to the center
				headerAlign: "center",
				editable: false,
			},
			{
				field: "interbankClabe",
				headerName: "Clabe interbancaria",
				width: 300,
				align: "center", // Align to the center
				headerAlign: "center",
				editable: false,
			},
			{
				field: "modifiedDate",
				headerName: "Fecha de modificación",
				width: 300,
				align: "center", // Align to the center
				headerAlign: "center",
				editable: false,
			},
			{
				field: "status",
				headerName: "Estado",
				width: 120,
				align: "center", // Align to the center
				headerAlign: "center",
				renderCell: (params) => (
					<span
						style={{
							fontWeight: 800,
							color: getColorForStatus(params.value),
						}}
					>
						{params.value}
					</span>
				),
				editable: false,
			},
			{
				field: "actions",
				headerName: "Acciones",
				width: 150,
				align: "center", // Align to the center
				headerAlign: "center",
				type: "actions",
				renderCell: (params) => (
					<Button
						onClick={() => handleRowClick(params)}
						sx={{ color: "primary" }}
					>
						Ver más
					</Button>
				),
				unsortable: true,
				editable: false,
			},
		],
		[]
	);

	const handleRowClick = (params: any) => {
		setDealershipId(params.row.agency_id);
		setDealershipName(params.row.name);
		setDealershipBankAccount(params.row.accountNumber);
		setModifiedDate(params.row.modifiedDate);
		setStatus(params.row.status);
		setInterbankClabe(params.row.interbankClabe);
		setOpenModal(true);
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true);
				const response = await getDealershipAdministration();

				// Add a unique_id identifier to each row and change the status message
				const dataWithIds = response.data.map((item: any) => {
					return {
						...item.dealershipBankAccount,
						...item.dealershipName,
					};
				});

				setRows(dataWithIds);
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
			<DataGrid
				initialState={{
					pagination: { paginationModel: { pageSize: 7 } },
				}}				rows={rows}
				columns={columns}
				getRowId={(row) => row.accountNumber}
				onRowClick={(params: any) => handleRowClick(params)}
				sx={{
					backgroundColor: "transparent",
					width: "100%",
					marginLeft: "3rem",

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

			<ModalAddAccount
				open={openModal}
				handleClose={() => setOpenModal(false)}
				dealershipId={dealershipId}
				dealershipName={dealershipName}
				dealershipBankAccount={dealershipBankAccount}
				interbankClabe={interbankClabe}
				modifiedDate={modifiedDate}
				status={status}
			/>
		</PageBackground>
	);
};

export default BankAccountsList;
