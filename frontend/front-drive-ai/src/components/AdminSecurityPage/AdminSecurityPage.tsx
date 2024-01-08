import React from "react";
import { PageBackground, TitleContainer } from "./styles";
import { Card } from "components/Card";
import { changePassword } from "services/ChangePassword/ChangePassword";
import { useAppContext } from "store/app-context/app-context";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";
import { Collapse } from "@mui/material";
import { AlertProps } from "@mui/material/Alert";
import { AlertColor } from "@mui/material/Alert";
import {
	TextField,
	Button,
	Box,
	CircularProgress,
	IconButton,
} from "@mui/material";
import { InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const AdminSecurityPage = () => {
	const appContext = useAppContext();
	const email = appContext.user?.email;

	// Estados para los inputs
	const [oldPassword, setOldPassword] = React.useState("");
	const [newPassword, setNewPassword] = React.useState("");
	const [confirmNewPassword, setConfirmNewPassword] = React.useState("");
	const [loading, setLoading] = React.useState(false);

	const [showOldPassword, setShowOldPassword] = React.useState(false);
	const [showNewPassword, setShowNewPassword] = React.useState(false);
	const [showConfirmNewPassword, setShowConfirmNewPassword] =
		React.useState(false);

	// manejo de alertas
	const [alert, setAlert] = useState({
		open: false,
		message: "",
		severity: "",
	});

	const showAlert = (message: string, severity: AlertColor) => {
		setAlert({ open: true, message, severity });
	};

	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === "Enter") {
			handlePasswordChange();
		}
	};

	function Alert(props: AlertProps) {
		return <MuiAlert elevation={6} variant="filled" {...props} />;
	}

	const passwordValidation =
		/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

	const handlePasswordChange = async () => {
		setLoading(true);

		if (!passwordValidation.test(newPassword)) {
			showAlert(
				"Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.",
				"error"
			);
			setLoading(false);
			return;
		}

		if (newPassword !== confirmNewPassword) {
			showAlert(
				"The new password and confirm password do not match.",
				"error"
			);
			setLoading(false);
			return;
		}

		if (!email) {
			showAlert("There was an error getting the email.", "error");
			setLoading(false);
			return;
		}

		// Assuming `changePassword` is a promise based function
		const response = await changePassword(email, oldPassword, newPassword);
		if (response.status >= 200 && response.status < 300) {
			showAlert("Password changed successfully.", "success");
		} else {
			showAlert(response.data.message, "error");
		}

		setLoading(false);
	};

	return (
		<>
			{/* Container for {left-bar, card, background */}
			<PageBackground>
				<Card
					width="90%"
					height="25rem"
					margin="1.2rem"
					borderRadius="None"
					cursor="default"
				>
					<TitleContainer>
						<h3>Cambiar contraseña</h3>
					</TitleContainer>
					<Box display="flex" flexDirection="row" paddingLeft={4}>
						<Box width="45%">
							<Box marginBottom={3}>
								<TextField
									required
									type={showOldPassword ? "text" : "password"}
									label="Anterior contraseña"
									variant="outlined"
									fullWidth
									onChange={(event) =>
										setOldPassword(event.target.value)
									}
									onKeyDown={handleKeyDown} // Handle Enter key press
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<IconButton
													onClick={() =>
														setShowOldPassword(
															!showOldPassword
														)
													}
												>
													{showOldPassword ? (
														<VisibilityOff />
													) : (
														<Visibility />
													)}
												</IconButton>
											</InputAdornment>
										),
									}}
								/>
							</Box>
							<Box marginBottom={3}>
								<TextField
									required
									type={showNewPassword ? "text" : "password"}
									label="Nueva contraseña"
									variant="outlined"
									fullWidth
									onChange={(event) =>
										setNewPassword(event.target.value)
									}
									onKeyDown={handleKeyDown} // Handle Enter key press
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<IconButton
													onClick={() =>
														setShowNewPassword(
															!showNewPassword
														)
													}
												>
													{showNewPassword ? (
														<VisibilityOff />
													) : (
														<Visibility />
													)}
												</IconButton>
											</InputAdornment>
										),
									}}
								/>
							</Box>
							<Box marginBottom={3}>
								<TextField
									required
									type={
										showConfirmNewPassword
											? "text"
											: "password"
									}
									label="Confirmar nueva contraseña"
									variant="outlined"
									fullWidth
									onChange={(event) =>
										setConfirmNewPassword(
											event.target.value
										)
									}
									onKeyDown={handleKeyDown} // Handle Enter key press
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<IconButton
													onClick={() =>
														setShowConfirmNewPassword(
															!showConfirmNewPassword
														)
													}
												>
													{showConfirmNewPassword ? (
														<VisibilityOff />
													) : (
														<Visibility />
													)}
												</IconButton>
											</InputAdornment>
										),
									}}
								/>
							</Box>
							<Box width="70%" marginTop={2}>
								<Button
									variant="contained"
									onClick={handlePasswordChange}
									fullWidth
									disabled={
										oldPassword === "" ||
										newPassword === "" ||
										confirmNewPassword === ""
									}
								>
									{loading ? (
										<CircularProgress
											color="inherit"
											size={30}
										/>
									) : (
										"Cambiar"
									)}
								</Button>
							</Box>
						</Box>
						<Box width="50%" marginLeft={2}>
							<Collapse in={alert.open && alert.severity !== ""}>
								{alert.severity !== "" && (
									<Alert
										severity={alert.severity as AlertColor}
										action={
											<IconButton
												aria-label="close"
												color="inherit"
												size="small"
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
						</Box>
					</Box>
				</Card>
			</PageBackground>
		</>
	);
};

export default AdminSecurityPage;
