import styled from "styled-components";
import theme from "theme/theme";

// Parent container. For the column's components
export const ColumnContainer = styled.div`
    display: grid;
    place-items: center;
    gap: 25px;
`;

// meant to hold an image the same width as the container holding it
export const ImageContainer = styled.img`
    margin-left: 0;
    width: 100%; 
    height: 60%;
    overflow: hidden;
    float: none;
    border-radius: 8px;
    object-fit: cover;
`;

// Div displaying the name or dealership information for the header
export const HeaderInfo = styled.div`
    text-align: center;
    font-family: Roboto, sans-serif;
`;


// p header displaying the price of the car
export const CarPrice = styled.p`
    text-align: center;
    font-weight: bold;
    font-family: Roboto, sans-serif;
    color: ${theme.palette.secondary.main};
`;

// Div that contains the lower six rows of information about the car
export const InfoContainer = styled.div`
    display: "flex"; 
    justifyContent: "row"; 
    flexDirection: "column"; 
    flexGrow: 4;
`;

export const InfoRow = styled.p`
    text-align: center;
    font-family: Roboto, sans-serif;
    font-size: 0.8rem;
`;




