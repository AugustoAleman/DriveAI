import React, { ChangeEvent, useEffect, useState } from "react";

import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";

import { Box } from "@mui/material";

import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import { createUpdateDocument } from "services/documents/createUpdateDocument";
import { useAppContext } from "store/app-context/app-context";
import {Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		alignItems: "center",
		"& > *": {
			marginRight: theme.spacing(1),
		},
	},
	input: {
		display: "none",
	},
}));


const FileInput: React.FC<any> = (props: any) => {
	const { fileType, handleChange } = props;
	const classes = useStyles();

	console.log("FILE TYPE IN FILE INPUT", fileType)
	return (
		<Box className={classes.root}>
			<input
				className={classes.input}
				id={`contained-button-file-${fileType}`}
				multiple
				type="file"
				onChange={e => handleChange(e, fileType)}
			/>
			<label htmlFor={`contained-button-file-${fileType}`}>
				<Button
					variant="outlined"
					style={{ background: "white" }}
					component="span"
					size="small"
				>
					Selecciona un archivo
				</Button>
			</label>
		</Box>
	)
}

const SettingsDocuments = () => {
	const appContext = useAppContext();

	// READY STATE
	const [ready, setReady] = useState(false);

	// HANDLE RESIZING
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);

	// LOADING
	const [loading, setLoading] = useState({ ine: false, license: false });
	const [success, setSuccess] = useState({ ine: false, license: false });


	// STYLES
	const [subtitleSize, setSubtitleSize] = React.useState(20);
	const [contentSize, setContentSize] = React.useState(18);
	const [buttonSize, setButtonSize] = React.useState(14);

	const changeFonts = (width: number) => {
		if (width < 400) {
			setSubtitleSize(18);
			setContentSize(14);
			setButtonSize(12);
		} else if (width < 600) {
			setSubtitleSize(18);
			setContentSize(14);
			setButtonSize(12);
		} else {
			setSubtitleSize(20);
			setContentSize(18);
			setButtonSize(14);
		}
	};

	// On Effect function that gets the size of the sceen and sets it to the state
	useEffect(() => {
		changeFonts(window.innerWidth);
		const handleResize = () => {
			setScreenWidth(window.innerWidth);
			changeFonts(window.innerWidth);
		};
		window.addEventListener("resize", handleResize);
		setReady(true);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>, fileType: number) => {
		console.log("FILETYPE", fileType);
		setSuccess({ine: false , license: false });

		if (event.target.files) {
			const file = event.target.files[0];
			fileType === 1 && setLoading(prev => ({ ...prev, license: true }));
			fileType === 3 && setLoading(prev => ({ ...prev, ine: true }));

			createDocument(file, fileType)
				.then(() => {
					if (fileType === 1) {
						setLoading(prev => ({ ...prev, license: false }));
						setSuccess(prev => ({ ...prev, license: true }));
					}
					if (fileType === 3) {
						setLoading(prev => ({ ...prev, ine: false }));
						setSuccess(prev => ({ ...prev, ine: true }));
					}
				})
				.catch((err) => {
					fileType === 1 && setLoading(prev => ({ ...prev, license: false }));
					fileType === 3 && setLoading(prev => ({ ...prev, ine: false }));
					console.log(err);
				});
		}
	}

	const createDocument = async (file: File, reqDocId: number) => {
		const formData = new FormData();
		formData.append('newFile', file);

		const documentData = {
			filePath: "documents/",
			newFile: formData,
			externalTable: "user",
			externalId: appContext.user?.id,
			reqDocId,
		};

		await createUpdateDocument(documentData)
	}

	return !ready ? (
		<></>
	) : (
		<Box
			sx={{
				width: screenWidth < 400 ? "110%" : "100%",
				minWidth: "fit-content",
				pl: screenWidth < 400 ? "-1rem" : "0rem",
				mx: screenWidth < 400 ? "-1rem" : "0rem",
			}}
		>
			<Box sx={{ fontSize: subtitleSize, fontWeight: "bold" }}>
				Mis documentos
			</Box>
			<Box sx={{ fontSize: contentSize, fontWeight: "normal", mb: 2 }}>
				Antes de subir tus documentos de compra ten en cuenta lo
				siguiente.
			</Box>

			<Box
				component="ul"
				sx={{ m: 0, p: 0, pl: 2, fontSize: contentSize }}
			>
				<Box component="li" sx={{ ml: 1, mb: 1 }}>
					Que los documentos sean vigentes.
				</Box>
				<Box component="li" sx={{ ml: 1, mb: 1 }}>
					Subir los archivos en formato PDF.
				</Box>
				<Box component="li" sx={{ ml: 1, mb: 1 }}>
					Que su contenido sea claro y legible.
				</Box>
				<Box component="li" sx={{ ml: 1, mb: 1 }}>
					Tanto INE como Licencia de manejo deberan ser presentadas
					por ambos lados en la misma hoja.
				</Box>
			</Box>

			<Box sx={{ fontSize: subtitleSize, fontWeight: "bold", mt: 2 }}>
				Subir/Descargar documentos registrados
			</Box>

			<Box sx={{ fontSize: contentSize, fontWeight: "normal", mt: 2 }}>
				Credencial de Elector (INE)
			</Box>

			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					fontSize: contentSize,
					fontWeight: "normal",
					mt: 2,
					alignItems: "center",
				}}
			>
				<>
					<FileInput key={"INE"} fileType={3} handleChange={handleFileInputChange}/>
					<UploadFileOutlinedIcon />
					{loading.ine && <CircularProgress />}
					{success.ine && <CheckCircleOutlineIcon />}
				</>
			</Box>

			<Box sx={{ fontSize: contentSize, fontWeight: "normal", mt: 2 }}>
				Licencia de Conducir
			</Box>

			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					fontSize: contentSize,
					fontWeight: "normal",
					mt: 2,
					alignItems: "center",
				}}
			>
				<>
					<FileInput key={"LICENCIA"} fileType={1} handleChange={handleFileInputChange}/>
					<UploadFileOutlinedIcon />
					{loading.license && <CircularProgress />}
					{success.license && <CheckCircleOutlineIcon />}
				</>
			</Box>
		</Box>
	);
};

export default SettingsDocuments;
