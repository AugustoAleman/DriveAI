import { useState, useEffect, useMemo } from "react";

// Importing custom styles
import { PageBackground } from "./styles";

// Import MUI components
import { Data } from "./types";
import { useAppContext } from "store/app-context/app-context";
import { useNavigate } from "react-router-dom";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { getDrivingTestBySalesman } from "services";
import moment from "moment";

const AssignedTestList = () => {
	const appContext = useAppContext();
	const navigate = useNavigate();
	const [rows, setRows] = useState<Data[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const handleRowClick = (params: any) => {
		navigate(`modal-page/${params.row.id}`, {
			state: {
				userId: params.row.userId,
				type: "Venta",
				name: params.row.name,
				surname: params.row.lastName,
				description: params.row.description,
				status: params.row.status
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
			{
				field: "id",
				headerName: "ID",
				width: 140,
				align: "center", // Align to the center
				headerAlign: "center",
				editable: false,
			},
			{
				field: "name",
				headerName: "Nombre",
				width: 240,
				align: "center", // Align to the center
				headerAlign: "center",
				editable: false,
			},
			{
				field: "lastName",
				headerName: "Apellido",
				width: 240,
				align: "center", // Align to the center
				headerAlign: "center",
				editable: false,
			},
			{
				field: "schedule",
				headerName: "Fecha de prueba",
				width: 300,
				renderCell: (params: any) =>
					moment(params.row.schedule).format("DD/MM/YYYY HH:MM:SS"),
				align: "center", // Align to the center
				headerAlign: "center",
				editable: false,
			},
			{
				field: "car",
				headerName: "Vehículo",
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
		],
		[]
	);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true);
				const response = await getDrivingTestBySalesman(
					appContext.user?.id as number
				);
				console.log("Response: ", response.data)

				// Add a unique_id identifier to each row and change the status message
				
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
			<DataGrid
				initialState={{
					pagination: { paginationModel: { pageSize: 6 } },
				}}
				rows={rows}
				columns={columns}
				getRowId={(row) => row.id}
				onRowClick={(params: any) => handleRowClick(params)}
				sx={{
					backgroundColor: "transparent",
					width: "100%",
					paddingLeft: "5.5rem",

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
