import styled  from "styled-components";

export const StyledModal = styled.div`
    top:  50% ;
    left:  50% ;
    transform:  translate(-50%; -50%) ;
    position:  absolute ;
    width:  70% ;
    height:  70% ;
    background:  white ;
    borderRadius:  8px ;
    overflow:  auto ;
    WebkitOverflowScrolling:  touch ;
    outline:  none ;

    @media (max-width: 768px) {
        width: 95%;
        height: 95%;
      }
`