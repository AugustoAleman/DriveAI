import styled from "styled-components";

export const PageBackground = styled.div`
	font-family: 'Roboto', sans-serif;
	background: linear-gradient(to bottom, #BCBCBC, white);
	display: flex;
	flex-direction: row;
	padding-left: 4rem;
	padding-top: 2rem;
	width: 100%;
	height: 100%;
	gap: 1rem;
	margin-top: 10.5rem;

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
`;

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
	gap: 18.5rem;

	margin-top: 0;
	margin-right: 8rem;

	h4 {
		margin-bottom: 0.5rem;
		color: #79797B;
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

	select
	{
		width: 20rem;
		height: 2.4rem;
		border: solid 1px black;
	}
`;
