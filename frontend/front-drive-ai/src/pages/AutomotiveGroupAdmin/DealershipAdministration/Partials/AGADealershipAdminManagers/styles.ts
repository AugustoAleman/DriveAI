import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";

export const PageBackground = styled.div`
	font-family: "Roboto", sans-serif;
	display: flex;
	//flex-direction: column;
	height: 40rem;
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
