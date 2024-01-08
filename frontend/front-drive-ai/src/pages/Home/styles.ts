import styled from "styled-components";
import theme from "theme/theme";

export const CenterDivColumn = styled.div`
    display: flex;
    justify-content: center;   
    height : 100%;
    flex-direction: column;
    
`;
export const GeneralHomeWrapper = styled.div`
    overflow: hidden;
`;
export const TextCustom = styled.p`
    font-size: 3.5vw;
    font-family: 'Roboto', sans-serif;
    font-weight: bold;
    margin: 30px 5%;
    @media screen and (max-width: 750px) {
        font-size: 20px;
        font-family: 'Roboto', sans-serif;
        font-weight: bold;
        margin: 30px 5%;
        text-align: center;
    
    }
`
export const TextDif = styled.span`
    color: ${theme.palette.secondary.main};
`
export const DivInput = styled.div`
    height: 5.2vh;
    @media screen and (max-width:750px) {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
`
export const CenterDiv = styled.div`
    display: flex;
    justify-content: center;   
    height: 100%;
    background-color: #F7F7F7;
    flex-direction: column;
    align-items: center;
    
    
    
    

`
export const ImageSize = styled.img`
    width: 80%;
`
export const CenterButtons = styled.div`
    padding-bottom:10px;
    width:100%;
    display: flex;
    justify-content: center;
    align-items: center;    
`
export const SpaceButtons = styled.div`
    margin: 0 10px;
`
export const Search = styled.input`
    width: 80%; 
    height: 40px;
    margin: 5px 10px;
    text-align: center;
    border: #FFFFFF; 
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
`
export const CustomHeaders = styled.h1`
    font-family: 'Roboto', sans-serif;
    text-align: center;
    color: ${theme.palette.primary.main};
    font-size: 3vw;
    @media screen and (max-width: 750px) {
        font-size: 12px;
        margin-top: 15px;
        /* Otros estilos para dispositivos móviles */
      }

`
export const DivRow = styled.div`
    width: 100%;
    height: 25%;
    display: flex;
    margin: 0px 0px 0px 0.2vw;
    display: flex;
    align-items: center;
    justify-content: center;
    
`
export const DivColumnR = styled.div`
    width: 45%;
    height: 100%; 
    display: flex;
    justify-content: center; 
    align-items: center;
    @media screen and (max-width: 750px) {
        width: 70%;
        height: 100%; 
        display: flex;
        justify-content: center; 
        align-items: center;
    
    }
`
export const Points = styled.p`
    border: 2px solid black;
    border-radius: 10px;
    width: 55%;
    height:50%;
    text-align:center;
    line-height:60px;
    font-size: 1.5vw;
    font-weight: bold;
    @media screen and (max-width: 750px) {
        border: 2px solid black;
        border-radius: 10px;
        width: 90px;
        text-align: center;
        line-height: 30px;
        font-size: 10px;
        font-weight: bold; 
    
    }
`
export const DivColumnResPoint = styled.div`
    width: 30%;
    height: 100%; 
    display: flex;
    justify-content: center; 
    align-items: center;
`
export const TextDescriptive = styled.p`
    font-family: 'Roboto', sans-serif;
    font-weight: bold;
    font-size: 1vw;
    width: 95%;
    text-align: justify;
    @media screen and (max-width: 750px) {
        font-family: 'Roboto', sans-serif;
        font-weight: bold;
        font-size: 10px;
        width: 90%;
        text-align: justify;
    
    }
`
export const DivColumnLine = styled.div`
    width: 10%;
    height: 100%; 
    display: flex;
    justify-content: center; 
    align-items: center;
    flex-direction: column;
`
export const Circle = styled.div`
    background-color:${theme.palette.secondary.main}; 
    height:10px; 
    width:10px; 
    border-radius:50px; 
    margin-top:60px; 
`
export const CircleMiddle = styled.div`
    background-color:${theme.palette.secondary.main}; 
    height:10px; 
    width:10px; 
    border-radius:50px;
`
export const CircleDown = styled.div`
    background-color:${theme.palette.secondary.main}; 
    height:10px; 
    width:10px;
    border-radius:50px;
    margin-bottom:60px;
`
export const SingleLine = styled.div`
    background-color:black; 
    height:70px; 
    width:2px;
`
export const LineBetweenPoint= styled.div`
    background-color:black; 
    height:47%; 
    width:2px; 
 
` 
export const SingleLineUp= styled.div`
    background-color:black; 
    height:50%; 
    width:2px;

`
export const DivColumn = styled.div`

    display: flex;
    background-color: #F7F7F7;
    justify-content: center;
    align-items: center; 
    width: 100%;
    
    @media screen and (max-width: 750px) {
        margin-top: 30px;
        /* Otros estilos para dispositivos móviles */
      }
    
    

`
export const Div1 = styled.div`
    width: 50%;
    margin: 50px 0 0 70px;
    @media screen and (max-width: 750px) {
        width: 80%;
        margin: 0;
        padding-top: 10px;
    }
`
export const TwoImg = styled.img`

    width: 50%;
    margin-left:20%; 
    
`
export const Text1 = styled.div`
    font-family: 'Roboto', sans-serif;
    font-weight: bold;
    font-size: 25px;
    @media screen and (max-width: 750px) {
        font-family: 'Roboto', sans-serif;
        font-weight: bold;
        text-align: center;
        font-size: 15px;
    }
`
export const Text2 = styled.div`
    font-family: 'Roboto', sans-serif;
    font-size: 15px;
    @media screen and (max-width: 750px) {
        font-family: 'Roboto', sans-serif;
        font-size: 10px;
        text-align: justify;
    }
`
export const DivButton = styled.div` 
    text-align: right;
    @media screen and (max-width: 750px) {
        text-align: center;
    
    }
`
export const Div2 = styled.div`
    width: 50%;
    margin: 50px 0 0 0;
    

`