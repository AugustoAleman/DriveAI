import styled from "styled-components";

export const PageBackground = styled.div`
	font-family: 'Roboto', sans-serif;
	background: linear-gradient(to bottom, #BCBCBC, white);
	display: flex;
	width: 100%;

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

export const ListContainer = styled.div`
	font-family: 'Roboto', sans-serif;
	display: flex;
	flex-direction: row;
	margin-left: 2rem;
	margin-right: 7rem;
	justify-content: space-between;

	h4 {
		font-family: 'Roboto', sans-serif;
		color: #979797;
		margin-left: 3px;
		margin-bottom: 1px;
		padding: 0px;
		font-size: 14px;
	}
`;

export const ShortFields = styled.div`
	font-family: 'Roboto', sans-serif;
	display: flex;
	flex-direction: row;
	margin-left: 2rem;
	margin-right: 7rem;
	justify-content: left;
	gap: 1rem;

	h4 {
		font-family: 'Roboto', sans-serif;
		color: #979797;
		margin-left: 3px;
		margin-bottom: 1px;
		padding: 0px;
		font-size: 14px;
	}

`;

export const Title = styled.h2`
	font-family: 'Roboto', sans-serif;
	color: #000000;
	font-size: 20px;
	margin-left: 2rem;
	margin-bottom: 0px;
`

export const LongCell = styled.div`
	font-family: 'Roboto', sans-serif;
	display: flex;
	flex-direction: column;
	margin-bottom: 1.2rem;

	input {
		width: 41rem;
		height: 30px;
		color: #000000;
	}

	h4 {
		font-family: 'Roboto', sans-serif;
		color: #979798;
		margin-left: 0px;
		margin-bottom: 4px;
	}
`;

export const ShortCell = styled.div`
	font-family: 'Roboto', sans-serif;
	display: flex;
	flex-direction: column;
	margin-bottom: 1.2rem;

	select {
		width: 10rem;
		height: 30px;
		color: #000000;
	}

	input {
		width: 10rem;
		height: 30px;
		color: #000000;
	}

	h4 {
		font-family: 'Roboto', sans-serif;
		color: #979798;
		margin-left: 0px;
		margin-bottom: 4px;
	}
`;

export const Cell = styled.div`
	font-family: 'Roboto', sans-serif;
	display: flex;
	flex-direction: column;
	margin-bottom: 1.2rem;

	input {
		width: 15rem;
		height: 30px;
		color: #000000;
	}

	h4 {
		font-family: 'Roboto', sans-serif;
		color: #979798;
		margin-left: 0px;
		margin-bottom: 4px;
	}
`;
