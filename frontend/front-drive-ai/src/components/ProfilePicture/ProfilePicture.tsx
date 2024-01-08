import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import { ProfilePictureProps } from "./types";
import { IconButton } from "@mui/material";
import { Box, Button } from "@material-ui/core";
import { Collapse } from "@mui/material";
import { AlertProps } from "@mui/material/Alert";
import { AlertColor } from "@mui/material/Alert";
import { ImageBox, Titulo, ImageContainer } from "./styles";
import { Modal, CircularProgress} from "@mui/material";
import MuiAlert from "@mui/material/Alert";

import CollectionsIcon from "@mui/icons-material/Collections";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

import Webcam from "react-webcam";
import CameraIcon from "@mui/icons-material/Camera";
import CloseIcon from "@mui/icons-material/Close";

import { getProfilePicture, putAddresses, putUserData } from "services";
import { uploadImage } from "services/images/uploadImage";
import { useAppContext } from "store/app-context/app-context";
import { useNavigate } from "react-router-dom";

const ProfilePicture: React.FC<ProfilePictureProps> = ({
	userId,
	name,
	surname,
	email,
	cellphone,
	addresses
}) => {
	let alertTimer: NodeJS.Timeout;
	const appContext = useAppContext();
	const [image, setImg] = useState("");
	const [isSaving, setIsSaving] = useState(false);
	// HANDLE RESIZING
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);

	const [alert, setAlert] = useState({
		open: false,
		message: "",
		severity: "",
	});

	const showAlert = (
		message: string,
		severity: AlertColor,
		duration: number = 2500
	  ) => {
		clearTimeout(alertTimer); // clear existing timer
		setAlert({ open: true, message, severity });

		alertTimer = setTimeout(() => {
		  setAlert((prevAlert) => ({ ...prevAlert, open: false }));
		}, duration);
	  };

	function Alert(props: AlertProps) {
		return <MuiAlert elevation={6} variant="filled" {...props} />;
	}

	// Calling function to display the image in a useEffect
	useEffect(() => {
		const getProfilePictureUrl = async () => {
			if (
				appContext.profilePicture !== null &&
				appContext.profilePicture !== undefined
			) {
				console.log(appContext.profilePicture);
				setImg(appContext.profilePicture as string);
			} else {
				const profilePicture = await getProfilePicture(userId);
				setImg(
					profilePicture.image_url === null
						? "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
						: profilePicture.image_url
				);
				appContext.setProfilePicture(profilePicture.image_url);
			}
		};
		getProfilePictureUrl();

		const handleResize = () => {
			setScreenWidth(window.innerWidth);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [appContext.profilePicture]); // Empty dependency array to run the effect only once when the component mounts

	const [cameraHover, setCameraHover] = useState(false);
	const [photoHover, setPhotoHover] = useState(false);

	const [takePicture, setTakePicture] = useState(false);

	const webcamRef = useRef(null);

	const handleMouseEnter = () => {
		setCameraHover(true);
		setPhotoHover(true);
	};

	const handleMouseLeave = () => {
		setCameraHover(false);
		setPhotoHover(false);
		console.log("Hover disabled!");
	};

	const videoConstraints = {
		facingMode: "user",
	};

	const videoStyle = {
		transform: "scaleX(-1)",
	};

	const b642img = (base64: string): File => {
		// Base64 image data
		const base64Data = base64;

		// Remove the data URL prefix
		const base64WithoutPrefix = base64Data.replace(
			/^data:image\/(png|jpeg|jpg);base64,/,
			""
		);

		// Decode the base64 data
		const decodedData = atob(base64WithoutPrefix);

		// Convert the decoded data to Uint8Array
		const dataArray = new Uint8Array(decodedData.length);
		for (let i = 0; i < decodedData.length; i++) {
			dataArray[i] = decodedData.charCodeAt(i);
		}

		// Create a Blob from the Uint8Array
		const blob = new Blob([dataArray], { type: "image/jpeg" });

		// Create a File from the Blob
		const file = new File([blob], "screenshot.jpg", { type: "image/jpeg" });

		// Now you have the converted file object that you can use as needed
		// console.log(file);
		return file;
	};

	const uploadPhoto = React.useCallback(() => {
		if (webcamRef.current) {
			// @ts-ignore: Unreachable code error
			const imageSrc = webcamRef.current.getScreenshot();
			setSelectedFile(b642img(imageSrc));
			setImg(imageSrc);
			setTakePicture(false);
		}
	}, []);

	const handleSave = async () => {
		setIsSaving(true);
		let user: any = {};

		try {
			const response = await uploadImage(selectedFile);
			const pfpUrl = response[0].url;
			user = {
				name,
				surname,
				cellphone,
				email,
				addresses,
				pfpUrl,
			};
		} catch (error) {
			console.log(error);
			user = {
				name,
				surname,
				cellphone,
				email,
				addresses,
			};
		}

		console.log("User object to save: ", user);

		const response_address = await putAddresses(addresses, appContext.user?.id);

		if (response_address === "Connection successful") {
			showAlert("Se han modificado tus datos.", "success");
		} else {
			showAlert("Error actualizando datos", "error");
		}

		const response2 = await putUserData(appContext.user?.email, user);

		if (response2 === "Connection successful") {
			showAlert("Se han modificado tus datos.", "success");
			appContext.setProfilePicture(user.pfpUrl);
		} else {
			showAlert("Error actualizando datos", "error");
		}
		// navigate("/settings");
		window.location.reload();
	};

	const [selectedFile, setSelectedFile] = useState<File | null>(null);

	const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			console.log(event.target.files[0]);
			setSelectedFile(event.target.files[0]);
			setImg(URL.createObjectURL(event.target.files[0]));
		} else {
			setSelectedFile(null);
		}
	};

	const handleClose = () => {
		setTakePicture(false);
	};

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: screenWidth < 700 ? "row" : "column",
			}}
			alignItems="center"
			width={screenWidth < 700 ? "90%" : "30%"}
			margin={screenWidth < 700 ? "0%" : "2%"}
			maxWidth="300px"
		>
			<ImageContainer
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				image={image}
			>
				{(cameraHover || photoHover) && (
					<div
						style={{
							display: "grid",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
							gap: "10px",
						}}
					>
						<IconButton
							onClick={() => setTakePicture(!takePicture)}
						>
							<PhotoCameraIcon
								sx={{
									color: "secondary.main",
									transform: "scale(1.5)",
								}}
							/>
						</IconButton>

						<IconButton component="label">
							<CollectionsIcon
								sx={{
									color: "secondary.main",
									transform: "scale(1.5)",
								}}
							/>
							<input
								type="file"
								accept=".jpg,.jpeg,.png,.jfif,.raw"
								hidden
								onChange={(e) => {
									console.log("change");
									handleFileInputChange(e);
								}}
							/>
						</IconButton>
						{/* </Box> */}
					</div>
				)}
			</ImageContainer>
			<Box
				sx={{
					m: screenWidth < 700 ? 0.5 : 2,
					alignItems: "center",
					display: "flex",
					flexDirection: "row",
				}}
			>
				<Button
					variant="contained"
					color="primary"
					fullWidth
					onClick={() => {
						console.log(selectedFile);
						handleSave();
					}}
				>
					{isSaving ? (
						<CircularProgress
							size={24}
							sx={{
								color: "white",
							}}
						/>

					) : (
						"Guardar"
					)}
				</Button>
			</Box>

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
									setAlert({ ...alert, open: false })
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
			<Modal
				open={takePicture}
				onClose={handleClose}
				aria-labelledby="select-image"
				className="selection-modal"
				disableAutoFocus
			>
				<ImageBox>
					<Titulo> ¡Tome una foto! </Titulo>
					<Webcam
						mirrored={true}
						audio={false}
						ref={webcamRef}
						screenshotFormat="image/jpeg"
						width={250}
						height={450}
						videoConstraints={videoConstraints}
					/>
					<IconButton
						size="large"
						style={{
							marginTop: "0.7rem",
							marginBottom: "0.7rem",
						}}
					>
						<CameraIcon
							style={{
								transform: "scale(2)",
							}}
						/>
					</IconButton>
				</ImageBox>
			</Modal>
			<Modal
				open={takePicture}
				onClose={() => setTakePicture(!takePicture)}
				aria-labelledby="select-image"
				className="selection-modal"
				disableAutoFocus
			>
				<ImageBox>
					<Titulo> ¡Tome una foto! </Titulo>
					<Webcam
						audio={false}
						style={videoStyle}
						ref={webcamRef}
						screenshotFormat="image/jpeg"
						width={250}
						height={450}
						videoConstraints={videoConstraints}
					/>
					<IconButton
						size="large"
						style={{
							marginTop: "0.7rem",
							marginBottom: "0.7rem",
						}}
						onClick={() => uploadPhoto()}
					>
						<CameraIcon
							style={{
								transform: "scale(2)",
							}}
						/>
					</IconButton>
				</ImageBox>
			</Modal>
		</Box>
	);
};

export default ProfilePicture;
