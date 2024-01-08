import { useState, useEffect, useMemo } from "react";

// Importing custom styles
import { PageBackground, Container } from "./styles";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Data } from "./types";

import { getBankAccountsHistory } from "services";

const MBankAccountsHistory = () => {
	const [rows, setRows] = useState<Data[]>([]);
	const [isLoading, setIsLoading] = useState(true);

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
				field: "IDTransaccion",
				headerName: "ID de la transacción",
				width: 200,
				align: "center", // Align to the center
				headerAlign: "center",
				editable: false,
			},
			{
				field: "Fecha",
				headerName: "Fecha",
				width: 190,
				align: "center", // Align to the center
				headerAlign: "center",
				editable: false,
			},
			{
				field: "Referencia",
				headerName: "Referencia",
				width: 240,
				align: "center", // Align to the center
				headerAlign: "center",
				editable: false,
			},
			{
				field: "CuentaOrigen",
				headerName: "Cuenta de origen (CLABE)",
				width: 240,
				align: "center", // Align to the center
				headerAlign: "center",
				editable: false,
			},
			{
				field: "AgenciaVinculado",
				headerName: "Agencia vinculada",
				width: 300,
				align: "center", // Align to the center
				headerAlign: "center",
				editable: false,
			},
			{
				field: "Monto",
				headerName: "Monto (MXN)",
				width: 190,
				align: "center", // Align to the center
				headerAlign: "center",
				editable: false,
			},
			{
				field: "Tipo",
				headerName: "Tipo",
				width: 140,
				align: "center", // Align to the center
				headerAlign: "center",
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
				const response = await getBankAccountsHistory();
				console.log("Response is: ", response);

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
					getRowId={(row) => row.Referencia}
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
		</PageBackground>
	);
};

export default MBankAccountsHistory;
