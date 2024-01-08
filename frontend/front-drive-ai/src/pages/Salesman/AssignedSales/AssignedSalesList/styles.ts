import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";

export const PageBackground = styled.div`
	font-family: "Roboto", sans-serif;
	display: flex;
	height: 40rem;
	margin-left: 12rem;
	margin-top: 14rem;
`;

export const ContentContainer = styled.div`
	font-family: "Roboto", sans-serif;
	display: flex;
	flex-direction: row;
`;

export const Add = styled.div`
	font-family: "Roboto", sans-serif;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-left: 0.4rem;
`;

export const useStyles = makeStyles((theme) => ({
	actionContainer: {
		marginRight: theme.spacing(5),
	},
	addButtonContainer: {
		width: "100%",
		display: "flex",
		justifyContent: "flex-end",
		paddingRight: theme.spacing(5),
	},
}));
