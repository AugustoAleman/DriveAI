import styled from "styled-components";

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
   margin-top: 15rem;
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
    width: 100%;
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

export const GraphsNSalesmen = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    column-gap: 3rem;
`;

export const SalesmenNames = styled.div`
    display: flex;
    flex-direction: column;

    & p {
        display: flex;
        flex-direction: row;
        align-items: center;
        column-gap: 0.5rem;
    }

`;

export const TotalsAndCSV = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: flex-end;
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