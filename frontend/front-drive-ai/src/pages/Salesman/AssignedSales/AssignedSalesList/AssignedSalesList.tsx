import { useState, useEffect, useMemo } from "react";

// Importing custom styles
import { PageBackground } from "./styles";

// Importing interface
import { Data } from "./types";

// Import MUI components
import { DataGrid, GridColDef } from "@mui/x-data-grid";

// Navigation
import { useNavigate } from "react-router-dom";
import { useAppContext } from "store/app-context/app-context";

// Service for result
import { getSalesmanSalesProcesses } from "services";

const AssignedTestList = () => {
	const navigate = useNavigate();
	const appContext = useAppContext();
	const [isLoading, setIsLoading] = useState(true);

	const handleRowClick = (params: any) => {
		navigate(`modal-page/${params.row.unique_id}`, {
			state: {
				userId: params.row.unique_id,
				type: "Venta",
				name: params.row.name,
				surname: params.row.surname,
				description: params.row.description,
				status: params.row.orderStatus
			},
		});
	};

	function getColorForStatus(status: string) {
		switch (status) {
			case "Activa":
				return "green";
			case "En proceso":
				return "#fc9917";
			case "Inactiva":
				return "red";
			default:
				return "black";
		}
	}

	const columns: GridColDef[] = useMemo(
		() => [
			{ field: "unique_id", headerName: "ID" },
			{
				field: "name",
				headerName: "Nombre",
				width: 170,
				align: "center", // Align to the center
				headerAlign: "center",
				editable: false,
			},
			{
				field: "surname",
				headerName: "Apellido",
				width: 240,
				align: "center", // Align to the center
				headerAlign: "center",
				editable: false,
			},
			{
				field: "vehicleName",
				headerName: "Vehículo",
				width: 240,
				align: "center", // Align to the center
				headerAlign: "center",
				editable: false,
			},
			{
				field: "description",
				headerName: "Descripción",
				width: 400,
				align: "center", // Align to the center
				headerAlign: "center",
				editable: false,
			},
			{
				field: "orderStatus",
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
		],
		[]
	);

	const rows = [
		{
			unique_id: "76",
			name: "Eduardo",
			surname: "Angeles Guerrero",
			vehicleName: "Kia Soneto",
			description: "Aqui es la descripción",
			orderStatus: "Activa",
		},
		{
			unique_id: "91",
			name: "Ernesto",
			surname: "Neto",
			vehicleName: "Mustang G20",
			description: "Aqui es la descripción",
			orderStatus: "Activa",
		},
		{
			unique_id: "96",
			name: "Abraham",
			surname: "Chalita",
			vehicleName: "Tesla Model 3",
			description: "Aqui es la descripción",
			orderStatus: "Activa",
		},
	]

	return (
		<PageBackground>
			<DataGrid
				initialState={{
					pagination: { paginationModel: { pageSize: 6 } },
					columns: {
						columnVisibilityModel: {
							unique_id: false,
						},
					},
				}}
				rows={rows}
				columns={columns}
				getRowId={(row) => row.unique_id}
				onRowClick={(params: any) => handleRowClick(params)}
				sx={{
					backgroundColor: "transparent",
					width: "100%",
					paddingLeft: "10rem",

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
		</PageBackground>
	);

};

export default AssignedTestList;
