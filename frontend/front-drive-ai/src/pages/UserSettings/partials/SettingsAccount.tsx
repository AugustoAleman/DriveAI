import React, { useEffect, useState } from "react";
// Import logic
import { Box, IconButton, TextField } from "@mui/material";
import { UserAddress } from "components/UserAddress";
// Import icons and mui stuff
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { ProfilePicture } from "components/ProfilePicture";
// Import services
import { getUserAddresses } from "services/User-ms/UserSettings/getUserAddresses";
import { useAppContext } from "store/app-context/app-context";
import { Address } from "services/User-ms/UserSettings/getUserAddresses";

const SettingsAccount = () => {
	const appContext = useAppContext();

	// READY STATE
	const [ready, setReady] = useState(false);

	const [name, setName] = useState<string | null>(null);
	const [surname, setSurname] = useState<string | null>(null);
	const [email, setEmail] = useState<string | null>(null);
	const [cellphone, setCellphone] = useState<string | null>(null);
	const [addresses, setAddresses] = useState<Address[]>([]);

	const [addressesToDelete, setAddressesToDelete] = useState<Address[]>([]);

	// HANDLE RESIZING
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);

	// STYLES
	const [subtitleSize, setSubtitleSize] = React.useState(20);
	const [contentSize, setContentSize] = React.useState(18);

	const changeFonts = (width: number) => {
		if (width < 400) {
			setSubtitleSize(18);
			setContentSize(14);
		} else if (width < 600) {
			setSubtitleSize(18);
			setContentSize(14);
		} else {
			setSubtitleSize(20);
			setContentSize(18);
		}
	};

	// On Effect function that gets the size of the sceen and sets it to the state
	useEffect(() => {
		const getAddresses = async () => {
			const addresses = await getUserAddresses(appContext.user?.id);
			if (addresses != null) {
				setAddresses(
					addresses.sort((a: Address, b: Address) =>
						a["isMain"] === b["isMain"] ? 0 : a["isMain"] ? -1 : 1
					)
				);
			}
		};

		changeFonts(window.innerWidth);
		const handleResize = () => {
			setScreenWidth(window.innerWidth);
			changeFonts(window.innerWidth);
		};

		window.addEventListener("resize", handleResize);
		getAddresses();
		setReady(true);
		return () => window.removeEventListener("resize", handleResize);
	}, []);


	type AddressField = "postal" | "address" | "city" | "state";

	const handleAddressChange = (
		field: AddressField,
		updatedAddress: string | null,
		index: number
	) => {
		setAddresses((prevAddresses) => {
			const copyOfAddresses = [...prevAddresses]; // create a copy of the addresses array

			const changeData = { ...copyOfAddresses[index] }; // Update the specific address object at the given index
			changeData[field] = updatedAddress; // Update the specific address object at the given index
			copyOfAddresses[index] = changeData; // Update the specific address object at the given index

			return copyOfAddresses; // return the updated address
		});
	};

	const handleAddAddress = () => {
		setAddresses([
			...addresses,
			{
				address: "Nueva calle",
				city: "Nueva ciudad",
				state: "Nuevo estado",
				postal: "Nueva postal",
				isMain: false,
				no_appartment: null,
				userId: appContext.user?.id,
				...({} as any),
			},
		]);
	};

	const handleRemoveAddress = (index: number) => {
		const updatedAddresses = [...addresses];
		updatedAddresses[index].is_deleted = true;
		setAddresses(updatedAddresses);
	};

	const handleMainAddressChange = (index: number) => {
		setAddresses((prevState) =>
			prevState.map((address, locIndex) =>
				locIndex === index
					? { ...address, isMain: true }
					: { ...address, isMain: false }
			)
		);
		console.log(addresses);
	};

	return !ready ? (
		<></>
	) : (
		<Box
			sx={{
				width: screenWidth < 400 ? "110%" : "100%",
				minWidth: "fit-content",
				pl: screenWidth < 400 ? "-1rem" : "0rem",
				mx: screenWidth < 400 ? "-1rem" : "0rem",
				paddingLeft: "1rem",
			}}
		>
			<Box sx={{ fontSize: subtitleSize, fontWeight: "bold" }}>
				Información general
			</Box>
			<Box sx={{ fontSize: contentSize, fontWeight: "normal", mb: 2 }}>
				Aqui estan los datos de tu cuenta y puedes modificarlos.
			</Box>

			<Box
				sx={{
					display: "flex",
					flexDirection: screenWidth < 700 ? "column" : "row",
					fontSize: subtitleSize,
					fontWeight: "bold",
					marginBottom: 0.5,
				}}
			>
				<ProfilePicture
					userId={appContext.user?.id}
					name={name}
					surname={surname}
					email={email}
					cellphone={cellphone}
					addresses={addresses}
				/>

				<Box
					sx={{
						display: "column",
						width: screenWidth < 700 ? "100%" : "60%",
					}}
				>
					<Box
						sx={{
							display: "flex",
							flexDirection: screenWidth < 700 ? "column" : "row",
							fontSize: subtitleSize,
							fontWeight: "bold",
							marginBottom: 0.5,
							gap: "0.5rem",
						}}
					>
						Datos personales
					</Box>
					<Box
						sx={{
							gap: 1,
							width: "100%",
						}}
					>
						<TextField
							id="name"
							label="Nombre"
							size="small"
							margin="normal"
							placeholder={appContext.user?.name}
							onChange={(e) => setName(e.target.value)}
							InputLabelProps={{
								shrink: true,
							}}
							fullWidth
						/>
						<TextField
							id="surname"
							label="Apellido"
							size="small"
							margin="normal"
							placeholder={appContext.user?.surname}
							onChange={(e) => setSurname(e.target.value)}
							InputLabelProps={{
								shrink: true,
							}}
							fullWidth
						/>
					</Box>

					<Box
						sx={{
							display: {
								sx: "column",
								md: "flex",
							},
							gap: 1,
							width: "100%",
						}}
					>
						<TextField
							id="email"
							label="Correo"
							size="small"
							margin="normal"
							placeholder={appContext.user?.email}
							onChange={(e) => setEmail(e.target.value)}
							InputLabelProps={{
								shrink: true,
							}}
							fullWidth
						/>
						<TextField
							id="phone"
							label="Teléfono"
							size="small"
							margin="normal"
							placeholder={appContext.user?.cellphone}
							onChange={(e) => setCellphone(e.target.value)}
							InputLabelProps={{
								shrink: true,
							}}
							fullWidth
						/>
					</Box>

					<Box
						sx={{
							display: "flex",
							fontSize: subtitleSize,
							fontWeight: "bold",
							marginTop: "1rem",
							marginBottom: 0.5,
							gap: "0.3rem",
							alignItems: "center",
						}}
					>
						Dirección (es)
						<IconButton onClick={handleAddAddress}>
							<AddCircleOutlineIcon />
						</IconButton>
					</Box>

					{addresses &&
						addresses.map((address, index) => (
							address.is_deleted ? null :
							<UserAddress
								key={address.id}
								city={address.city as string}
								state={address.state as string}
								address={address.address as string}
								postal={address.postal as string}
								main={address.isMain}
								onClick={() => handleMainAddressChange(index)}
								onRemove={() => handleRemoveAddress(index)}
								onAddressChange={(
									e: React.ChangeEvent<HTMLInputElement>
								) =>
									handleAddressChange(
										"address",
										e.target.value,
										index
									)
								}
								onCityChange={(
									e: React.ChangeEvent<HTMLInputElement>
								) =>
									handleAddressChange(
										"city",
										e.target.value,
										index
									)
								}
								onStateChange={(
									e: React.ChangeEvent<HTMLInputElement>
								) =>
									handleAddressChange(
										"state",
										e.target.value,
										index
									)
								}
								onPostalChange={(
									e: React.ChangeEvent<HTMLInputElement>
								) =>
									handleAddressChange(
										"postal",
										e.target.value,
										index
									)
								}
							/>
						))}
				</Box>
			</Box>
		</Box>
	);
};

export default SettingsAccount;
