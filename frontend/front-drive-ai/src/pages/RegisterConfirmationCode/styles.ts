import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100%;
`;

export const Row = styled.div`
    width: 70%;
`;

export const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 30px;
    padding: 20px;
`;