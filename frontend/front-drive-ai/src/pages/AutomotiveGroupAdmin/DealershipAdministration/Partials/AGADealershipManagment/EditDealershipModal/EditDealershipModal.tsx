import React, { useEffect, useState, useRef } from "react";
import {
	CircularProgress,
	Stack,
	TextField,
	Button,
	Box,
	Grid,
} from "@mui/material";
import { GenericModal } from "../../../../../../components/GenericModal";
import { getDealershipById } from "services/User-ms/AGA/getDealershipById";
import { updateAddress } from "services/User-ms/AGA/updateAddress";
import { updateDealership } from "services/User-ms/AGA/updateDealership";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";
import { Collapse } from "@mui/material";
import { AlertProps } from "@mui/material/Alert";
import { AlertColor } from "@mui/material/Alert";
import { IconButton } from "@material-ui/core";
import { Row } from "./styles";

interface EditDealershipModalProps {
	open: boolean;
	handleClose: () => void;
	dealershipId: number;
	refresh: () => void;
}

const EditDealershipModal: React.FC<EditDealershipModalProps> = (props) => {
	const { open, handleClose, dealershipId } = props;
	const [dealership, setDealership] = useState<any | null>(null);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [ciudad, setCiudad] = useState("");
	const [latitude, setLatitude] = useState("");
	const [longitude, setLongitude] = useState("");
	const autoCompleteRef = useRef<google.maps.places.Autocomplete>();
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const options = {
			componentRestrictions: { country: "mx" },
			fields: ["address_components", "geometry", "icon", "name"],
		};

		if (inputRef.current) {
			autoCompleteRef.current =
				new window.google.maps.places.Autocomplete(
					inputRef.current,
					options
				);

			autoCompleteRef.current.addListener("place_changed", () => {
				const selectedPlace = autoCompleteRef.current?.getPlace();

				if (selectedPlace) {
					const addressComponents = selectedPlace.address_components;
					const street = addressComponents?.find((component: any) =>
						component.types.includes("route")
					)?.long_name;
					const number = addressComponents?.find((component: any) =>
						component.types.includes("street_number")
					)?.long_name;
					const city = addressComponents?.find((component: any) =>
						component.types.includes("locality")
					)?.long_name;
					const postalCode = addressComponents?.find(
						(component: any) =>
							component.types.includes("postal_code")
					)?.long_name;
					const state = addressComponents?.find((component: any) =>
						component.types.includes("administrative_area_level_1")
					)?.long_name;

					const address = `${street || ""} ${number || ""}`;

					setCiudad(city || "");

					const geometry = selectedPlace.geometry;
					const lat = geometry?.location?.lat();
					const lng = geometry?.location?.lng();

					setLatitude(lat?.toString() || "");
					setLongitude(lng?.toString() || "");

					// Update dealership state here:
					if (dealership) {
						setDealership({
							...dealership,
							address: {
								...dealership.address,
								address: address,
								state: state,
								postal: postalCode,
								city: city,
							},
						});
					}
				}
			});
		}
	}, [dealership]);
	// }, [inputRef.current]);

	const [alert, setAlert] = useState({
		open: false,
		message: "",
		severity: "",
	});

	const showAlert = (message: string, severity: AlertColor) => {
		setAlert({ open: true, message, severity });
	};

	function Alert(props: AlertProps) {
		return (
			<MuiAlert
				elevation={6}
				variant="filled"
				{...props}
				style={{ display: "flex", alignItems: "center" }}
			/>
		);
	}

	useEffect(() => {
		if (!open) {
			setAlert({ open: false, message: "", severity: "" });
		}
	}, [open]);

	useEffect(() => {
		const fetchDealership = async () => {
			try {
				setLoading(true);
				const response = await getDealershipById(dealershipId);
				setDealership(response);
				setCiudad(response.address.city || "");
			} catch (error) {
				setError(true);
			} finally {
				setLoading(false);
			}
		};

		if (open) {
			fetchDealership();
		}
	}, [open, dealershipId]);

	useEffect(() => {
		if (!open) {
			setDealership(null);
		}
	}, [open]);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (dealership) {
			setDealership({
				...dealership,
				name: event.target.value,
			});
		}
	};

	const handleAddressChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		if (dealership) {
			setDealership({
				...dealership,
				address: {
					...dealership.address,
					address: event.target.value,
				},
			});
		}
	};

	const handleStateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (dealership) {
			setDealership({
				...dealership,
				address: {
					...dealership.address,
					state: event.target.value,
				},
			});
		}
	};

	const handlePostalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (dealership) {
			setDealership({
				...dealership,
				address: {
					...dealership.address,
					postal: event.target.value,
				},
			});
		}
	};

	const handleSubmit = async () => {
		try {
			setLoading(true);

			if (dealership) {
				const addressResponse = await updateAddress(
					dealership.address.id,
					dealership.address.userId,
					dealership.address.state,
					ciudad,
					dealership.address.address,
					dealership.address.postal,
					dealership.address.no_appartment,
					dealership.address.isMain,
					latitude,
					longitude
				);

				if (
					addressResponse.status >= 200 &&
					addressResponse.status < 300
				) {
					const dealershipResponse = await updateDealership(
						dealership.id,
						dealership.name,
						addressResponse.data.id
					);

					if (
						dealershipResponse.status >= 200 &&
						dealershipResponse.status < 300
					) {
						console.log(
							"Updated dealership:",
							dealershipResponse.data
						);
						showAlert("Agencia actualizada con éxito!", "success");

						setTimeout(() => {
							handleClose();
						}, 2000);

						try {
							props.refresh();
						} catch (error) {
							console.log(
								"error al actualizar la tabla de agencias"
							);
						}

					} else {
						console.log(
							"Error updating dealership:",
							dealershipResponse
						);
						showAlert("Ocurrió un error", "error");
					}
				} else {
					console.log("Error updating address:", addressResponse);
					showAlert("Ocurrió un error", "error");
				}
			}
		} catch (error) {
			console.log("Error updating dealership:", error);
			showAlert("Ocurrió un error", "error");
		} finally {
			setLoading(false);
		}
	};

	return (
		<GenericModal open={open} handleClose={handleClose}>
			<Box
				display="flex"
				flexDirection="column"
				alignItems="center"
				justifyContent="center"
				p={8}
			>
				{loading && <CircularProgress />}
				{error && (
					<Alert severity="error">
						Error al obtener los datos del concesionario.
					</Alert>
				)}
				{dealership && (
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								fullWidth
								label="ID"
								variant="outlined"
								value={dealership.id}
								disabled
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								fullWidth
								label="Name"
								variant="outlined"
								value={dealership.name}
								onChange={handleInputChange}
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								fullWidth
								inputRef={inputRef}
								variant="outlined"
								placeholder={dealership.address.address}
								value={dealership.address.address}
								onChange={handleAddressChange}
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								fullWidth
								label="State"
								variant="outlined"
								value={dealership.address.state}
								onChange={handleStateChange}
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								fullWidth
								label="Postal"
								variant="outlined"
								value={dealership.address.postal}
								onChange={handlePostalChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<Stack direction="row" spacing={2}>
								<Button
									variant="contained"
									onClick={handleSubmit}
								>
									Guardar cambios
								</Button>
								<Button
									variant="outlined"
									onClick={handleClose}
								>
									Cancelar
								</Button>
							</Stack>
						</Grid>
					</Grid>
				)}
				<Row style={{ width: "70%", paddingTop: "30px" }}>
					<Collapse in={alert.open && alert.severity !== ""}>
						{alert.severity !== "" && (
							<Alert
								severity={alert.severity as AlertColor}
								action={
									<IconButton
										aria-label="close"
										color="inherit"
										onClick={() =>
											setAlert({
												...alert,
												open: false,
											})
										}
									>
										<CloseIcon fontSize="inherit" />
									</IconButton>
								}
							>
								{alert.message}
							</Alert>
						)}
					</Collapse>
				</Row>
			</Box>
		</GenericModal>
	);
};

export default EditDealershipModal;
