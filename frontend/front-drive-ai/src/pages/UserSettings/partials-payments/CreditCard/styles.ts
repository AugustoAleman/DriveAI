import styled from "styled-components";
import CreditCardIcon from '@mui/icons-material/CreditCard';

export const CreditIcon = styled(CreditCardIcon)`
    right:1080px;
    position: absolute;
    @media (max-width:769px){
        right:350px;
    }
`

export const TextCredit = styled.p`
    position:relative;
    top: 30px;
    left:1px;
    text-align:center;
`