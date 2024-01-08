import styled from "styled-components"
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';

export const DepositIcon = styled(RequestQuoteIcon)`
    left:730px;
    position: absolute;
    bottom:480px;
    @media (max-width:769px){
        left:320px;
        bottom:370px;
    }
`

export const TextDeposit = styled.p`
    position:relative;
    top: 40px;
    left:1px;
    text-align:center;
`