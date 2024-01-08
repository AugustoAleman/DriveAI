import { ChangeEvent, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, IconButton, Typography } from "@material-ui/core";
import { InsertDriveFile } from "@mui/icons-material";

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

interface InputCredentialProps {
	accept?: string;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputCredential = (props: InputCredentialProps) => {
	const { accept, onChange } = props;

	const classes = useStyles();
	const [selectedFile, setSelectedFile] = useState<File | undefined>(
		undefined
	);

	return (
		<Box className={classes.root}>
			<input
				accept={accept}
				className={classes.input}
				id="contained-button-file"
				multiple
				type="file"
				onChange={onChange}
			/>
			<label htmlFor="contained-button-file">
				<Button
					variant="outlined"
					style={{ background: "white" }}
					component="span"
					size="small"
				>
					Selecciona un archivo
				</Button>
			</label>
			{selectedFile && (
				<>
					<Typography variant="body1">{selectedFile.name}</Typography>
					<IconButton
						onClick={() => setSelectedFile(undefined)}
						size="small"
					>
						<InsertDriveFile fontSize="small" />
					</IconButton>
				</>
			)}
		</Box>
	);
};

export default InputCredential;
