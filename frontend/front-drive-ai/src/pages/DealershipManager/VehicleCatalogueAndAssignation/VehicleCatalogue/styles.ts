import { makeStyles } from '@material-ui/core/styles';
import styled from "styled-components";


export const PageBackground = styled.div`
	font-family: 'Roboto', sans-serif;
	background: linear-gradient(to bottom, #BCBCBC, white);
	display: flex;
	width: 100%;
    margin-top: 13rem;
	justify-content: center;

	h1 {
		font-family: 'Roboto', sans-serif;
		color: #000000;
		margin: 0px;
		padding: 0px;
		font-size: 40 px;
	}

	h3 {
		font-family: 'Roboto', sans-serif;
		color: #979797;
		margin-left: 3px;
		margin-bottom: 1px;
		padding: 0px;
		font-size: 14px;
	}

	@media only screen and (min-width: 600px) and (max-width: 798px) {
		padding: 20px;
		align-items: left;

		h1 {
		  font-size: 60px;
		}

		h3 {
		  font-size: 16px;
		}
	  }
`;

export const IconButtonDiv = styled.div`
    display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-left: auto;
	margin-right: 0;
	padding-right: 5%;
`;

const useStyles = makeStyles({
	IconButtonSize: {
		height: "15vh",
		weight: "15vw",
	}
})

export default useStyles;
