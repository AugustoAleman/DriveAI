import styled from "styled-components";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

export const Compositor = styled.div`
	font-family: 'Roboto', sans-serif;
	display: flex;
	flex-direction: column;
	width: 100%;
`;

export const Client = styled.div`
	font-family: 'Roboto', sans-serif;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center; /* center child elements vertically */
`;

export const CentralContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
	width: 86%;
	margin-bottom: 1rem;
	margin-top: 1rem;
    @media (max-width: 768px) {
        width: 100%;
      }
`;

export const ActionsContainer = styled.div`
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: row;
  align-items: center; /* center vertically */
  width: 100%;
  margin-top: 2rem;
  @media (max-width: 768px) {
    flex-direction: row;
    width: 90%;
  }
`;

export const ActionsContainer2 = styled.div`
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: row;
  align-items: center; /* center vertically */
  justify-content: center; /* center horizontally */
  width: 100%;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 2rem;
  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    margin-bottom: 2rem;
    margin-top: 2rem;
  }
`;

export const Arrow = styled.div`
@media (max-width: 768px) {
  margin-left: 2.5rem;
}
`;

export const Title = styled.div`
  font-family: 'Roboto', sans-serif;
  flex: 1; /* take up remaining horizontal space */
  text-align: center; /* center horizontally */
  font-weight: bold;
  font-size: 35px;
  @media (max-width: 768px) {
    font-size: 25px;
    flex-wrap: wrap;
  }
`;


export const CentralSubContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    heigth: 100%;
    width: 100%;
    @media (max-width: 768px) {
        flex-direction: column; 
        justify-content: center; 
        align-items: center; 
        overflow-y: hidden; 
        margin-left:0rem;
      }
`

export const AddButtonContainer = styled.div`
  margin-left: 1rem;
  display: flex;
  width: 5%;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
`

export const StyledAddButton  = styled.div`
  border-radius: 50%;
  width: 35px;
  height: 35px;
  &:hover {
    background-color: lightgray;
    cursor: pointer;
  }

  &:active {
    transform: scale(0.9);
  }
`

export const CardsContainer = styled.div`
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    justify-content: flex-start;
    & > * {
        margin-right: 1.5rem; /* add space between columns */
        margin-bottom: 2rem;
        &:first-child{
            margin-left: 1.5rem;
        }
        &:last-child {
            margin-right: 0.5rem; /* remove margin from last column */
        }
    }
    @media (max-width: 768px) {
        text-align: center;
        width: 100%;
        flex-direction: column;
        justify-content: center; 
        & > * {
          margin-right: 1rem; /
          margin-bottom: 2rem;
          margin-left:1.5rem;
          &:first-child{
              margin-left: 0rem;
              margin-right: 1rem;
              margin-left:1.5rem;
          }
          &:last-child {
            margin-right: 1rem;
            margin-left:1.5rem;
          }
      }
        
`;



