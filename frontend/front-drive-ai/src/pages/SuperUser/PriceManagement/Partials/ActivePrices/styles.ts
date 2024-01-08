import styled from "styled-components";

export const PageBody = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;

    @media screen and (max-width: 768px) {
        flex-direction: column;
    }

    @media screen and (min-width: 769px) and (max-width: 1440px) {
        flex-wrap: wrap;
    }
`;
