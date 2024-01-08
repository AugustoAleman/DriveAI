import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";

export const PageBackground = styled.div`
	background: linear-gradient(to bottom, #bcbcbc, white);
	font-family: "Roboto", sans-serif;
	display: flex;
	flex-direction: row;
	height: 40rem;
	margin-top: 14rem;
`;

export const Container = styled.div`
	background: linear-gradient(to bottom, #bcbcbc, white);
	font-family: "Roboto", sans-serif;
	display: flex;
	flex-direction: row;
	margin-left: 16rem;
	margin-top: 1rem;
	height: 43rem;
	width: 70%;
`;

export const Add = styled.div`
  font-family: "Roboto", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const useStyles = makeStyles((theme) => ({
	actionContainer: {
		marginRight: theme.spacing(5),
	},
	filterContainer: {
		width: "60%",
	},
	addButtonContainer: {
		width: "40%",
		display: "flex",
		justifyContent: "flex-end",
		paddingRight: theme.spacing(5),
	},
}));

export const ModalContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin-left: 5rem;
	width: 100%;
	height: 100%;
`;

export const ModalHeader = styled.div`
	display: flex;
	flex-direction: row;
	margin-bottom: 0;

	h1 {
		margin-top: 2rem;
		margin-bottom: 0;
	}
`;

export const ModalFieldsNames = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-around;
	gap: 13.5rem;

	margin-top: 0;
	margin-right: 8rem;

	h4 {
		margin-bottom: 0.5rem;
		color: #79797b;
	}

	input {
		width: 20rem;
		height: 2.4rem;
	}
`;

export const ButtonContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-end;

	margin-top: 1rem;
	margin-right: 8rem;
`;

export const ModalRow = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;

	margin-top: 0;
	margin-right: 8rem;
	gap: 2.3rem;

	input {
		width: 20rem;
		height: 2.4rem;
		border: solid 1px black;
	}

	select {
		width: 20rem;
		height: 2.4rem;
		border: solid 1px black;
	}
`;
