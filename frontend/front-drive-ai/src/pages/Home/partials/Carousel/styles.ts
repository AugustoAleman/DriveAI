import styled from "styled-components";
import theme from "theme/theme";

export const Div = styled.div `
    width:100vw;
    display:flex;
    align-items:center;
    justify-content: center;
    flex-direction: column;
    
    img{
        width: 5vw;
        height: 5vw;
        border-radius:100%;
    }
    p{
        font-size:15px;
        text-align: justify;
        @media screen and (max-width: 750px) {
            font-size:10px;
            /* Otros estilos para dispositivos móviles */
          }
    }
    
`
export const DivRes= styled.div `
    height:30vw;
    @media screen and (max-width: 750px) {
    height:100%;
    /* Otros estilos para dispositivos móviles */
  }
`
export const Rectangle = styled.div`
    background: #F7F7F7;
    border-radius: 5px;
    width: 60vw;
    display:flex;
    align-items:center;
    justify-content: center;
    flex-direction: column;
    @media screen and (max-width: 750px) {
        width: 75vw;
        /* Otros estilos para dispositivos móviles */
    }
`
export const DivDescription = styled.div`
    width: 90%; 
    

`
export const DivImage = styled.div`
    width:100%;
    margin-left:5vw;
    margin-top:2vw;

`
export const DivInfo = styled.div`
    width:100%;
    margin-left:5vw;
    
`
export const DivInfoName = styled.div`
    width:100%;
    margin-left:5vw;
    color: ${theme.palette.secondary.main};
    
`
export const DivBottoms = styled.div`
    margin: 3vw 0 5vw 0;

`