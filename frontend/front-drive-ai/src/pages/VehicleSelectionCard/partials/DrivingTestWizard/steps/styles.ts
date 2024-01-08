import styled from "styled-components";
import theme from "theme/theme";

export const ContentContainer = styled.div`
    height:100%;
    width:100%;
    display: flex;
    flex-direction: column;
    align-items:center;
`;

export const Header = styled.h1`
    font-size: 2vw;
    text-align: center;
    margin: 0%;
    @media screen and (max-width: 768px){
        font-size: 1rem;
    }
`;

export const DatePickerContainer = styled.div`
    margin: 3vh 0px 3vh 0px;
    display: flex;
    flex-direction: column;
    align-items:center;
`;
export const ScrolContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    overflow-y: scroll;
    height: 15rem;
    width: 100%;
    &::-webkit-scrollbar {
        width: 6px;
        background-color: white;
    }
    &::-webkit-scrollbar-thumb {
        background-color: ${theme.palette.tertiary.main};
        border-radius: 5px;
        width: 6px;
    }
`;
export const UploadDocumentButtonContainer = styled.div`
    margin: 1vh 0px 1vh 0px;
    width: 100%;
    display: flex;
    justify-content: center;
`;
export const CarInfoRoot = styled.div`
    width: 80%;
    height: 60%;
    margin: 0px 2vw 0px 2vw;
    display: flex; 
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex: 0 1 auto;
`;

export const CarImageContainer = styled.div`
    width: 45%;
    height: 100%;    
    flex: 1 1 auto;
`;

export const CarImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
`;

export const CarInfoContainer = styled.div`
    width: 50%;
    height: 100%;
    margin: 0px 0px 0px 5%;    
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
`;

export const CarInfoRow = styled.div`
    margin: 5px 0px 5px 0px;
    font-size: 1.5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const CarInfoLabel = styled.div`
    font-weight: bold;
    margin-right: 5px;
`

export const CarInfoValue = styled.span`
    font-size: 1.2rem;
`