import styled from "styled-components";

export const CardContainer = styled.div`
  margin-top: 0vh;
  height: 85%;
  width: 60%;
  @media screen and (max-width: 768px){
    width: 90%;
  }
  min-height: 500px;
`;

export const CardContent = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;


export const DivTicket = styled.div`
height:100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

`;
export const RowConfirmation = styled.div`
  display: flex;
  flex-direction: row;
`;
export const ConfirmationInfoWrapper = styled.div`
  width: 40%;
  padding-bottom: 10px;
`;

export const TicketImage = styled.img`
  width: 80%;
  
`;

export const TicketTitle = styled.p`
  font-weight: bold;
  margin: 8px 0 ;
`
export const TicketHeader = styled.p`
  font-weight: bold;
  margin: 8px 0 ;
  width: 50%;
`
export const TicketInfo = styled.p`
  
  margin: 8px 0 ;
`

// wizard wrapper styles
export const QuoterWizardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 3px;
    align-items: center;
    width: 100vw;
`;

export const WizardDividerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
`;

export const QuoterWizardTitleWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: end;
    border-bottom: 1px solid #CBD0D0;
    height: 8vh;
`;

export const ElementsQWT = styled.div`
    padding-bottom: 0.3rem;
`;

export  const SectionTitle = styled.p`
    margin: 0;
    font-weight: bold;
    padding: 0%;
`;

