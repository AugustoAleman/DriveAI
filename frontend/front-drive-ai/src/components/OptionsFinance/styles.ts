import styled from "styled-components";
import theme from "../../theme/theme";

export const HeaderBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  background: ${theme.palette.tertiary.main};
  cursor: default;
  // user-select: none ;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  .h2
  {
	  font-family: 'Roboto', sans-serif;
	  color: ${theme.palette.primary.main};
  }

  .container
  {
	  position: relative;
  }

  .recommended-icon
  {
	  position: absolute;
	  top: -120px;
	  left: -208px;
	  width: 200px;
	  height: 200px;
  }

  @media screen and (max-width: 440px){
	.recommended-icon
	{
	  top: -108px;
	  left: -140px;
	  width: 170px;
	  height: 170px;
	}
  }
`;

export const TextBoxUnique = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	align-self: center;
	cursor: default;
	margin-top: 50px;
	gap: 5px;

  p {
    font-weight: bold;
    font-size: 24px;
    font-family: 'Roboto', sans-serif;
	margin: 0px;
  }

`;

export const TextBoxMonthly = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	align-self: center;
	cursor: default;

  div.custom-one
  {
	  display: flex;
	  flex-direction: row;
	  justify-content: center;
	  align-items: center;
	  align-self: center;
	  cursor: default;
	  gap: 10px;
	  margin-top: 10px;
	  margin-bot: 5px;

	  select {
		border-color: transparent;
		background: transparent;
		color: #79797B;
		border-radius: 5px;
		font-size: 18px;
		font-family: 'Roboto', sans-serif;
		font-weight: bold;
	  }
  }

  p {
    font-weight: bold;
    font-size: 22px;
    font-family: 'Roboto', sans-serif;
	margin: 1px;
  }
`;
