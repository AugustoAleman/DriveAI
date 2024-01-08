import styled from "styled-components";
import { HeaderBoxProps } from "./types";

export const DriveAILogoContainer = styled.div`
  display: flex;
  align-items: center;
  
  div {
    display: flex;
    align-items: center;
  }

  img {
    height: 2rem;
  }
`

export const HeaderRoutes = styled.div`
  display: flex;
  flex-grow: 3;
  gap: 2.3rem;
  align-items: center;

  @media (max-width: 1000px) {
    display: none;
  }
`

export const HeaderAvatarRegister = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 2;
`

export const HeaderMobileRoutesMenu = styled.div`
  display: none;

  @media (max-width: 1000px) {
    display: inline;
  }
`

export const SignupButtonContainer = styled.div<HeaderBoxProps>`
    text-decoration: underline;

    &:hover {
      background-color: ${(props) => props.buttonHoverBlue || "#FEF6F6"};
    }
  }
`

export const HeaderBox = styled.header<HeaderBoxProps>`
	& {
		width: 100%;
		height: 100%;
    padding: 0.6rem 4rem;
	}
	display: flex;
	justify-content: space-between;
	align-items: center;
	align-self: center;

	a,
	svg,
	p {
		text-decoration: none;
		color: ${(props) => props.white || "white"};
	}

  
	@media (max-width: 1000px) {
    & {
      padding: 0.6rem 0.6rem;
    }
	}
`;
