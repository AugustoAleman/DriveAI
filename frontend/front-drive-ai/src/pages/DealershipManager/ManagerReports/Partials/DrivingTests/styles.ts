import styled from "styled-components";

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 17rem;
    margin-left: 3rem;
    @media (min-width: 900px) {
      margin-top: 15rem;
      margin-left: 0;
    }
  
`;

export const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 2rem;
    width: 100%;
`;

export const DropboxHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: space-between;
    column-gap: 0.8rem;
`;

export const Dropbox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    column-gap: 0.8rem;
`;

export const GraphSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const TotalsAndCSV = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    align-items: center;
`;

export const Totals = styled.div`
    display: flex;
    flex-direction: row;
    column-gap: 1.5rem;
`;

export const CSVDownload = styled.div`
    text-transform: none;
    display: flex;
    align-items: center;
    column-gap: 0.7rem;
`;