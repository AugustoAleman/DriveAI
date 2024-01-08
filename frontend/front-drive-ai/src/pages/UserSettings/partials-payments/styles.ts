import styled from "styled-components";
import DeleteIcon from '@mui/icons-material/Delete';

export const CreditBox = styled.div`
    position: absolute;
    left:290px;
    @media (max-width:769px){
        left:220px;
    }
`
export const CvvBox = styled.div`
    position:absolute;
    left:400px;
    bottom:230px;
    @media (max-width:769px){
        left:220px;
    }
`

export const DueDateBox = styled.div`
    @media (max-width:769px){
        position:relative;
        left:220px;
        bottom:110px;
    }
`

export const RegisterBox = styled.div`
    position: absolute;
    bottom:440px;
    left:700px;
    @media (max-width:769px){
        left:260px;
    }
    
`

export const CancelBox = styled.div`
    position: absolute;
    bottom:360px;
    left:710px;
    @media (max-width:769px){
        left:260px;
        bottom:390px;
    }
`

export const PayPalBox = styled.div`
    position: absolute;
    left:390px;
    bottom:150px;
    @media (max-width:769px){
        left:220px;
        bottom:50px;
    }
`

export const DepositBox = styled.div`
    position: absolute;
    left:290px;
    @media (max-width:769px){
        left:220px;
    }
`

export const RegisterTwoBox = styled.div`
    position: absolute;
    bottom:310px;
    left:700px;
    @media (max-width:769px){
        left:240px;
        bottom:300px;
    }
`

export const CancelTwoBox = styled.div`
    position: absolute;
    bottom:250px;
    left:710px;
    @media (max-width:769px){
        left:260px;
        bottom:250px;
    }
`

export const TitlePayment = styled.h2`
    position:absolute;
    bottom:520px;
    @media (max-width:769px){
        bottom:490px;
    }
`

export const MediaRegisterButton = styled.div`
    @media (max-width:769px){
        position:absolute;
        left:240px;
        bottom:350px;
    }
`

export const MediaCancelButton = styled.div`
    @media (max-width:769px){
        position:absolute;
        left:260px;
        bottom:310px;
    }
`