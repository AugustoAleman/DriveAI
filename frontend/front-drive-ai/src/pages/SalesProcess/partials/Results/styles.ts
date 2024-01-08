import styled from "styled-components";

export const  Title = styled.h1` 


margin-left: 15rem;
font-size: 50px;
`
export const TableInfo = styled.table`
    font-size: 24px;
    font-family: 'Roboto', sans-serif;
    margin-left: 10rem;
    @media (max-width: 768px) {
        /* Styles for screens with a width of 768px or smaller */
        margin-left: 1rem;
        font-size: 20px;
    }
    @media (max-width: 425px) {
        /* Styles for screens with a width of 425px or smaller */
        margin-left: 0;
        font-size: 18px;
    }
`;

export const TDInfo = styled.td`
    padding-left: 1em;
    font-family: 'Roboto', sans-serif;
    @media (max-width: 425px) {
        /* Styles for screens with a width of 425px or smaller */
        padding-left: 0.5em;
    }
`;

export const THInfo = styled.th`
    text-align: left;
    font-family: 'Roboto', sans-serif;
    @media (max-width: 425px) {
        /* Styles for screens with a width of 425px or smaller */
        padding-left: 0.5em;
    }
`;

export const THInfoTwo = styled.th`
    padding-left: 1.4em;
    font-family: 'Roboto', sans-serif;
    text-align: left;
    @media (max-width: 425px) {
        /* Styles for screens with a width of 425px or smaller */
        padding-left: 0.5em;
    }
`;