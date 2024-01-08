import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";

export const PageBackground = styled.div`
	font-family: "Roboto", sans-serif;
	display: flex;
	flex-direction: column;
	width: 90%;
	height: 40vh;
	margin-left: 10rem;
	margin-right: 2rem;
	margin-top: 14rem;

	h1 {
		font-family: "Roboto", sans-serif;
		color: #000000;
		margin: 0px;
		padding: 0px;
		font-size: 40px;
	}
	h3 {
		font-family: "Roboto", sans-serif;
		color: #979797;
		margin-left: 3px;
		margin-bottom: 1px;
		padding: 0px;
		font-size: 14px;
	}
`;

export const useStyles = makeStyles((theme) => ({
	actionContainer: {
		marginRight: theme.spacing(5),
	},
	filterContainer: {
		width: "60%",
		marginLeft: theme.spacing(5),
	},
	addButtonContainer: {
		width: "40%",
		display: "flex",
		justifyContent: "flex-end",
		paddingRight: theme.spacing(5),
	},
}));
