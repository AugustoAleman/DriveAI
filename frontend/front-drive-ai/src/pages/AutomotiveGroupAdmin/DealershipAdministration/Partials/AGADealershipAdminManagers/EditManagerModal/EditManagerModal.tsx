import React, { useEffect, useState } from "react";
import {
	EditManagerProps,
	FetchHandlingType,
	AgencyObj,
	Dealership,
	User,
} from "./types";
import { Alert, Stack } from "@mui/material";
import { GenericModal } from "../../../../../../components/GenericModal";
import {
	DealershipsListContainer,
	EditManagerBox,
	UnassignedItems,
	AssignedItems,
	ManagerInfoContainer,
} from "./styles";
import { getUserById } from "../../../../../../services/User-ms/getUserById";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import Collapse from "@mui/material/Collapse";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { getDealershipsByAGId } from "../../../../../../services/User-ms/AGA/getDealershipsByAGId";
import CircularProgress from "@mui/material/CircularProgress";
import { assignDealershipToUser } from "../../../../../../services/User-ms/AGA/assingDealership";
import { unAssignDealershipToUser } from "../../../../../../services/User-ms/AGA/unAssignDealership";
import { useAppContext } from "../../../../../../store/app-context/app-context";

const EditManagerModal: React.FC<EditManagerProps> = (props) => {
	const { open = false, handleClose, managerId } = props;
	const { user: loggedUser } = useAppContext();

	const [assignedDealerships, setAssignedDealerships] = useState<AgencyObj[]>(
		[]
	);
	const [unAssignedDealerships, setUnAssignedDealerships] = useState<
		AgencyObj[]
	>([]);
	const [user, setUser] = useState<User>({
		id: 0,
		name: "",
		surname: "",
		email: "",
	});
	const [loading, setLoading] = useState<FetchHandlingType>({
		add: false,
		delete: false,
		dealerships: false,
		user: false,
	});
	const [error, setError] = useState<FetchHandlingType>({
		add: false,
		delete: false,
		dealerships: false,
		user: false,
	});
	const [openCollapse, setOpenCollapse] = useState(false);
	const [clickedDealership, setClickedDealership] = useState(0);

	useEffect(() => {
		const getDealershipsOfGroup = (userDealerships: AgencyObj[]) => {
			setDefaultErrorState();
			setLoading((prev) => ({ ...prev, dealerships: true }));
			if (loggedUser) {
				getDealershipsByAGId(loggedUser.agId)
					.then((data) => {
						const assignedDealershipsIds: number[] =
							userDealerships.map(
								(dealership: AgencyObj) => dealership.value
							);
						const filteredUnAssigned = data.filter(
							(dealer: AgencyObj) =>
								!assignedDealershipsIds.includes(dealer.value)
						);
						setUnAssignedDealerships(filteredUnAssigned);
						setLoading((prev) => ({ ...prev, dealerships: false }));
					})
					.catch(() => {
						setError((prev) => ({ ...prev, dealerships: true }));
						setLoading((prev) => ({ ...prev, dealerships: false }));
					});
			}
		};

		const getManager = () => {
			setDefaultErrorState();
			setLoading((prev) => ({ ...prev, user: true }));
			getUserById(managerId)
				.then((data) => {
					const assignedDealershipsList = data.dealerships.map(
						(dealership: Dealership) => ({
							value: dealership.id,
							label: dealership.name,
						})
					);

					setAssignedDealerships(assignedDealershipsList);
					getDealershipsOfGroup(assignedDealershipsList);
					setUser(data);
					setLoading((prev) => ({ ...prev, user: false }));
				})
				.catch(() => {
					setError((prev) => ({ ...prev, user: true }));
					setLoading((prev) => ({ ...prev, user: false }));
				});
		};

		if (managerId) {
			setAssignedDealerships([]);
			setUnAssignedDealerships([]);
			getManager();
		}
	}, [loggedUser, managerId]);

	const onClickDeleteDealership = (dealershipId: number) => {
		setLoading((prev) => ({ ...prev, delete: true }));
		setDefaultErrorState();
		setClickedDealership(dealershipId);
		unAssignDealershipToUser(user.id, dealershipId)
			.then(() => {
				handleDeleteDealershipInState(dealershipId);
				setLoading((prev) => ({ ...prev, delete: false }));
				setClickedDealership(0);
			})
			.catch(() => {
				setError((prev) => ({ ...prev, delete: true }));
				setLoading((prev) => ({ ...prev, delete: false }));
			});
	};

	const onClickAddDealership = (dealershipId: number) => {
		setLoading((prev) => ({ ...prev, add: true }));
		setDefaultErrorState();
		setClickedDealership(dealershipId);
		assignDealershipToUser(user.id, dealershipId)
			.then(() => {
				handleAddDealershipInState(dealershipId);
				setLoading((prev) => ({ ...prev, add: false }));
				setClickedDealership(0);
			})
			.catch(() => {
				setError((prev) => ({ ...prev, add: true }));
				setLoading((prev) => ({ ...prev, add: false }));
			});
	};

	const handleDeleteDealershipInState = (value: number) => {
		const dealership = assignedDealerships.find(
			(dealershipEl) => dealershipEl.value === value
		);
		if (dealership) {
			setAssignedDealerships((prevState) =>
				prevState.filter((dealershipEl) => dealershipEl.value !== value)
			);
			setUnAssignedDealerships((prevState) => [...prevState, dealership]);
		}
	};

	const handleAddDealershipInState = (value: number) => {
		const dealership = unAssignedDealerships.find(
			(dealershipEl) => dealershipEl.value === value
		);
		if (dealership) {
			setUnAssignedDealerships((prevState) =>
				prevState.filter((dealershipEl) => dealershipEl.value !== value)
			);
			setAssignedDealerships((prevState) => [...prevState, dealership]);
		}
	};

	const setDefaultErrorState = () =>
		setError({
			add: false,
			delete: false,
			dealerships: false,
			user: false,
		});

	const handleOpenCollapse = () => setOpenCollapse((prev) => !prev);

	return (
		<GenericModal open={open} handleClose={handleClose}>
			<EditManagerBox>
				<h3>Información general</h3>
				{(error.user || error.dealerships) && (
					<Alert severity="error">
						Algo salió mal al cargar los datos
					</Alert>
				)}
				{loading.user || loading.dealerships ? (
					<CircularProgress />
				) : (
					<>
						<ManagerInfoContainer>
							<div>
								<label>Nombre</label>
								<p>{`${user.name} ${user.surname}`}</p>
							</div>
							<div>
								<label>Correo electrónico</label>
								<p>{user.email}</p>
							</div>
						</ManagerInfoContainer>
						<h3>Agencias</h3>
						<DealershipsListContainer>
							<h5>Agencias asignadas</h5>
							<List>
								<Stack spacing={1}>
									{!loading.user &&
										assignedDealerships.length === 0 && (
											<Alert severity="warning">
												No tiene agencias asignadas
											</Alert>
										)}
									{assignedDealerships.length > 0 &&
										assignedDealerships.map(
											(dealership: AgencyObj) => (
												<AssignedItems>
													<ListItem
														key={dealership.value}
														secondaryAction={
															<IconButton
																edge="end"
																onClick={() =>
																	onClickDeleteDealership(
																		dealership.value
																	)
																}
															>
																{clickedDealership ===
																	dealership.value &&
																loading.delete ? (
																	<CircularProgress />
																) : (
																	<DeleteIcon />
																)}
															</IconButton>
														}
													>
														{dealership.label}
													</ListItem>
												</AssignedItems>
											)
										)}
									{error.delete && (
										<Alert severity="error">
											Algo salió mal al desasignar la
											agencia
										</Alert>
									)}
								</Stack>
							</List>
						</DealershipsListContainer>
						<DealershipsListContainer>
							<Stack>
								<List
									sx={{
										width: "100%",
										bgcolor: "background.paper",
									}}
								>
									<ListItemButton
										onClick={handleOpenCollapse}
									>
										<ListItemText primary="Agencias no asignadas" />
										{openCollapse ? (
											<ExpandLess />
										) : (
											<ExpandMore />
										)}
									</ListItemButton>
									<Stack
										maxHeight={"20rem"}
										overflow={"scroll"}
									>
										<Collapse
											in={openCollapse}
											timeout="auto"
											unmountOnExit
										>
											<List
												component="div"
												disablePadding
											>
												<Stack spacing={1}>
													{unAssignedDealerships.length >
														0 &&
														unAssignedDealerships.map(
															(
																dealership: AgencyObj
															) => (
																<UnassignedItems>
																	<ListItem
																		key={
																			dealership.value
																		}
																		secondaryAction={
																			<IconButton
																				edge="end"
																				onClick={() =>
																					onClickAddDealership(
																						dealership.value
																					)
																				}
																			>
																				{clickedDealership ===
																					dealership.value &&
																				loading.add ? (
																					<CircularProgress />
																				) : (
																					<AddCircleOutlineIcon />
																				)}
																			</IconButton>
																		}
																	>
																		{
																			dealership.label
																		}
																	</ListItem>
																</UnassignedItems>
															)
														)}
													{error.add && (
														<Alert severity="error">
															Algo salió mal al
															asignar la agencia
														</Alert>
													)}
												</Stack>
											</List>
										</Collapse>
									</Stack>
								</List>
							</Stack>
						</DealershipsListContainer>
					</>
				)}
			</EditManagerBox>
		</GenericModal>
	);
};

export default EditManagerModal;
