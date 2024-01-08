import styled, {keyframes} from "styled-components";

const fadeInOut = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

export const RoundedContainer = styled.div`
    background-color: #C5C5C5;
    width: 80%;
    height: 5%;
    opacity: 0;
    border-radius: 20px;
    animation: ${fadeInOut} 2s infinite;
`;