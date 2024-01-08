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

export const FieldContainer = styled.div`
	margin-bottom: 1rem;
	margin-top: 1rem;
	margin-left: 2rem;
	display: flex;
	flex-direction: row;
	align-items: center;
	align-content: center;
	gap: 3rem;

	@media (max-width: 1204px) {
		flex-wrap: wrap;
		gap: 1rem;
		margin-left: 1rem;
		margin-right: 0;
		align-items: center;
	}
	@media (max-width: 702px) {
		flex-direction: column;
		gap: 1rem;
		margin-left: 1rem;
		margin-right: 0;
		align-items: center;
		margin-left: 0;
		justify-content: center;
	}
`;

export const Title = styled.h2`
	font-family: "Roboto", sans-serif;
	color: #000000;
	font-size: 20px;
	margin-top: 1.5rem;
	margin-left: 2rem;
	margin-bottom: 0px;
`;
