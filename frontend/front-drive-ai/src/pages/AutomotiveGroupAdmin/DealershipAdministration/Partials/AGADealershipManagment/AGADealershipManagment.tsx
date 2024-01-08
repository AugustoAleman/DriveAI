import { useState, useEffect, useMemo } from "react";

import { Data } from "./types";
import { Add, PageBackground } from "./styles";
import { InputStateProps } from "../../../../../components/AddManagerModal/types";

import { addManagerToGroup } from "../../../../../services/User-ms/AGA/addManagerToGroup";
import { getAdministration } from "services/User-ms/AGA/getAdministration";
import { useAppContext } from "store/app-context/app-context";
import { createManager } from "../../../../../services/User-ms/AGA/createManager";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import moment from "moment";

import { EditDealershipModal } from "./EditDealershipModal";
import { AddDealershipModal } from "components/AddDealershipModal";
import { GlobalStyle } from "./EditDealershipModal/styles";

const AGADealershipAdminManagers = () => {
	const appContext = useAppContext();
	const userId = appContext?.user?.id || 0;
	const [rows, setRows] = useState<Data[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [openEdit, setOpenEdit] = useState(false);
	const [rowId, setRowId] = useState<number>(0);

	const [updateData, setUpdateData] = useState<boolean>(false);

	const handleRowActionsClick = (params: any) => {
		setRowId(params.row.id);
		setOpenEdit(true);
	};

	const columns: GridColDef[] = useMemo(
		() => [
			{
				field: "unique_id",
				headerName: "ID",
			},
			{
				field: "id",
				headerName: "ID de la agencia",
				width: 150,
				align: "center", // Align to the center
				headerAlign: "center",
				editable: false,
			},
			{
				field: "name",
				headerName: "Nombre",
				width: 140,
				align: "center", // Align to the center
				headerAlign: "center",
				editable: false,
			},
			{
				field: "address",
				headerName: "Dirección",
				width: 200,
				align: "center", // Align to the center
				headerAlign: "center",
				editable: false,
			},
			{
				field: "date",
				headerName: "Fecha de registro",
				width: 200,
				renderCell: (params: any) =>
					moment(params.row.date).format("DD/MM/YYYY HH:MM:SS"),
				align: "center", // Align to the center
				headerAlign: "center",
				editable: false,
			},
			{
				field: "managerName",
				headerName: "Encargado",
				width: 200,
				align: "center", // Align to the center
				headerAlign: "center",
				editable: false,
			},
			{
				field: "status",
				headerName: "Estado",
				width: 100,
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
				width: 125,
				align: "center", // Align to the center
				headerAlign: "center",
				type: "actions",
				renderCell: (params) => (
					<Button
						onClick={() => handleRowActionsClick(params)}
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

	const refresh = async () => {
		try {
			setIsLoading(true);
			const response = await getAdministration(userId, "dealerships");

			const dataWithIds = response.data.map(
				(item: any, index: number) => {
					let statusLabel = "";

					if (item.status === 0) {
						statusLabel = "Activa";
					} else if (item.status === 1) {
						statusLabel = "En proceso";
					} else if (item.status === 2) {
						statusLabel = "Inactiva";
					}

					return {
						unique_id: index + 1,
						...item,
						status: statusLabel,
					};
				}
			);

			setRows(dataWithIds);
		} catch (error) {
			console.log("Error fetching data: ", error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (isLoading) {
			refresh();
		}
	}, []);

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

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true);
				const response = await getAdministration(userId, "dealerships");
				console.log("Setting the data to be used: ", response.data);

				// Add a unique_id identifier to each row and change the status message
				const dataWithIds = response.data.map(
					(item: any, index: number) => {
						let statusLabel = "";

						if (item.status === 0) {
							statusLabel = "Activa";
						} else if (item.status === 1) {
							statusLabel = "En proceso";
						} else if (item.status === 2) {
							statusLabel = "Inactiva";
						}

						return {
							unique_id: index + 1,
							...item,
							status: statusLabel,
						};
					}
				);

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

	const addManager = async (inputs: InputStateProps) => {
		const userToCreate = { ...inputs, user_type: "MANAGER" };
		return createManager(userToCreate)
			.then((user) => {
				const { user: loggedUser } = appContext;
				loggedUser && addManagerToGroup(user.id, loggedUser.agId);
			})
			.catch((err) => {
				throw Error(err);
			});
	};

	return (
		<>
			<GlobalStyle />
			<PageBackground>
				<DataGrid
					initialState={{
						pagination: { paginationModel: { pageSize: 7 } },
						columns: {
							columnVisibilityModel: {
								unique_id: false,
							},
						},
					}}
					autoPageSize
					rows={rows}
					columns={columns}
					getRowId={(row) => row.unique_id}
					onRowClick={(params: any) => handleRowActionsClick(params)}
					sx={{
						backgroundColor: "transparent",
						width: "100%",

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
				<Add>
					<AddDealershipModal />
				</Add>
				<EditDealershipModal
					open={openEdit}
					handleClose={() => setOpenEdit(false)}
					dealershipId={rowId}
					refresh={refresh}
				/>
			</PageBackground>
		</>
	);
};

export default AGADealershipAdminManagers;
