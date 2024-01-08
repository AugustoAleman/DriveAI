import styled from "styled-components";

export const MainContainer = styled.div`
    width: 95%;
    display: flex;
    flex-flow: column;
    justify-content: center;
    padding: 2% 5%;
    row-gap: 1.5rem;
    background-color: transparent;
	margin-top: 12rem;
	margin-left: 2rem;
`;

export const Print = styled.div`
    text-align: left;
    text-transform: none;
    display: flex;
    flex-direction: row;
    column-gap: 0.3rem;
    justify-content: space-around;
    align-items: flex-end;
    `;

export const MoreActions = styled.div`
    text-align: left;
    text-transform: none;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: flex-end;
    `;

export const Headers = styled.div`
    display: flex;
    flex-flow: row;
`;

export const Graphs = styled.div`
    border: solid black;
        display: flex;
        flex-flow: row;
    `;

export const TotalNIncomes = styled.div`
border: solid black;
    display: flex;
    flex-flow: column;

`;

export const Sales = styled.div`
border: solid black;
    display: flex;
    flex-flow: column;

`;

export const TotalsTable = styled.div`
    display: flex;
    flex-flow: column;

`;

export const TotalsTableContent = styled.div`
    display: flex;
    flex-flow: row;
    flex-wrap: wrap;
    row-gap: 0.5rem;

`;

export const TotalsTableCol = styled.div`
    flex-basis: 50%;
    padding: 0.5rem;
    box-sizing: border-box;

`;

export const GraphContainer = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    row-gap: 1rem;

`;

export const GraphGroup = styled.div`
    width: 100%;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;

`;

export const GraphHeader = styled.div`
    width: 100%;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;

`;

export const GeneralCardsContainer = styled.div`
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: stretch;
    column-gap: 2rem;
`;

export const CardsGroup = styled.div`
    display: flex;
    flex-flow: column;
    align-items: center;
    row-gap: 1.5rem;
`;

export const DataTable = styled.div`
    height: 400px;
    width: 100%;
`;
