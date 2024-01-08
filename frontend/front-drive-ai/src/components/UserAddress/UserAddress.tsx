import React from "react"; // importing React because we are using JSX

// Importing the Card component from the components folder and my props for the OptionsFinance component
import { UserAddressProps } from "./types";

import { Box, Checkbox, IconButton, TextField } from "@mui/material";
import { Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

/**
 * UserAddress component
 */
const UserAddress: React.FC<UserAddressProps> = ({
	city = "",
	state = "",
	address = "",
	postal = "",
	main = false,
	onClick,
	onRemove,
	onAddressChange,
	onStateChange,
	onCityChange,
	onPostalChange,
}) => {
	return (
		<>
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "flex-start",
					width: "100%",
					alignItems: "center",
				}}
			>
				{/*Dirección {index + 1}*/}
				<p>Principal</p>
				<Checkbox
					checked={main}
					onClick={onClick}
				/>

				<IconButton
					sx={{
						padding: "0.1rem",
					}}
					aria-label="borrar"
				>
					<DeleteIcon
						sx={{
							color: "primary.main",
						}}
						onClick={onRemove}
					></DeleteIcon>
				</IconButton>
			</Box>

			<Box
				sx={{
					display: {
						sx: "column",
						md: "flex",
					},
					// flexDirection:
					// 	screenWidth < 700
					// 		? "column"
					// 		: "row",
					justifyContent: "flex-start",
					gap: "0.5rem",
					marginRight: "1rem",
				}}
			>
				<TextField
					id="state"
					label="Estado"
					margin="dense"
					size="small"
					placeholder={state}
					onChange={onStateChange}
					InputLabelProps={{
						shrink: true,
					}}
					fullWidth
				/>
				<TextField
					id="city"
					label="Ciudad"
					margin="dense"
					size="small"
					placeholder={city}
					onChange={onCityChange}
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
					// flexDirection:
					// 	screenWidth < 700
					// 		? "column"
					// 		: "row",
					justifyContent: "flex-start",
					gap: "0.5rem",
					mb: 0.5,
					marginRight: "1rem",
				}}
			>
				<TextField
					id="street"
					label="Calle"
					margin="dense"
					size="small"
					placeholder={address}
					onChange={onAddressChange}
					InputLabelProps={{
						shrink: true,
					}}
					fullWidth
				/>
				<TextField
					id="zipCode"
					label="Código postal"
					margin="dense"
					size="small"
					placeholder={postal}
					onChange={onPostalChange}
					InputLabelProps={{
						shrink: true,
					}}
					fullWidth
				/>
			</Box>

			<Box
				sx={{
					display: "flex",
					// flexDirection:
					// 	screenWidth < 700
					// 		? "column"
					// 		: "row",
					justifyContent: "space-between",
					gap: "0.5rem",
					mb: 0.5,
				}}
			></Box>
		</>
	);
};

export default UserAddress;
