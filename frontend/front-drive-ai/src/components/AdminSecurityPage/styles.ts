import styled from "styled-components";

export const PageBackground = styled.div`
	font-family: "Roboto", sans-serif;
	background: linear-gradient(to bottom, #BCBCBC, white);
	display: flex;
	flex-direction: column;
	padding-left: 7rem;
	padding-top: 30px;
	width: 100%;
	height: 100%;
	margin-top: 12rem;

	h1 {
		font-family: "Roboto", sans-serif;
		color: #000000;
		margin: 0px;
		padding: 0px;
		font-size: 40 px;
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

export const TitleContainer = styled.div`
	font-family: 'Roboto', sans-serif;
	color: #000000;
	margin-left: 2rem;
	margin-bottom: 20px;
	padding-top: 6px;
	display: flex;
	flex-direction: column;

	h3 {
		font-family: 'Roboto', sans-serif;
		color: #000000;
		margin-left: 3px;
		margin-bottom: 1px;
		padding: 0px;
		font-size: 18px;
	}

	h4 {
		font-family: 'Roboto', sans-serif;
		color: #979798;
		margin-bottom: 0.1rem;
		font-size: 15px;
	}

	input {
		margin-top: 10px;
		font-family: 'Roboto', sans-serif;
		width: 250px;
		height: 34px;
	}

	Button {
		margin-top: 20px;
	}

	@media (max-width: 702px) {
		margin-left: 1rem;
		margin-right: 0;
		align-items: center;
	}
`;
