import styled from "styled-components";
import theme from "theme/theme";

export const GeneralDiv = styled.div `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;    
    overflow: hidden;
    
    img{
        width: 100%;
    }

`
export const Texto = styled.p`
    width: 80%;
    font-size: 20px;
    font-family: 'Roboto', sans-serif;
    margin-bottom: 2vw;
    text-align: justify;
    @media screen and (max-width: 750px) {
        font-size: 10px;
        margin-bottom: 15px;
    /* Otros estilos para dispositivos móviles */
  }
`

export const CustomHeaders = styled.h1`
    font-family: 'Roboto', sans-serif;
    text-align: center;
    color: ${theme.palette.primary.main};
    font-size: 30px;
    @media screen and (max-width: 750px) {
        font-size: 10px;
      }
`

export const DivColumn = styled.div`

    display: flex;
    justify-content: center;
    align-items: center; 
    width: 100%;
    background-color: #F7F7F7;
    @media screen and (max-width: 750px) {
           
        padding: 10px 10px;
       
        /* Otros estilos para dispositivos móviles */
      }
    
    
    
    

`
export const Div1 = styled.div`
    width: 50%;
    margin: 20px 0 0 50px;
    @media screen and (max-width: 750px) {
           
        width: 80%;
        margin: 0;
        /* Otros estilos para dispositivos móviles */
      }

`

export const Text1 = styled.p`
    font-family: 'Roboto', sans-serif;
    font-weight: bold;
    font-size: 30px;
    @media screen and (max-width: 750px) {
        font-family: 'Roboto', sans-serif;
        font-weight: bold;
        text-align: center;
        font-size:10px;
    /* Otros estilos para dispositivos móviles */
  }
`
export const Text2 = styled.p`
    font-family: 'Roboto', sans-serif;
    font-size: 20px;
    text-align: justify;
    @media screen and (max-width: 750px) {
        
        font-family: 'Roboto', sans-serif;
        font-size: 10px;
        text-align: justify;
            /* Otros estilos para dispositivos móviles */
    } 
`

export const CenterButton = styled.div`

    text-align: right;
    @media screen and (max-width: 750px) {
        text-align: center;
        
      }

`
export const Div2 = styled.div`
    width: 50%;
    margin: 50px 0 0 0;
    @media screen and (max-width: 750px) {
   
        margin:0;
    /* Otros estilos para dispositivos móviles */
  }

`
export const TwoImg = styled.img`

    width: 50%;
    margin-left:20%; 
    @media screen and (max-width: 750px) {
       
        width: 70%;
        margin-left: 20%;
        /* Otros estilos para dispositivos móviles */
    }
`