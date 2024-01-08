import styled from "styled-components";

export const SendbirdBox = styled.div`
  padding: 2rem;
  max-width: 20%;
  max-height: 50%;
  box-shadow: 1px 1px gray;
  
  & {
    border-radius: 10px;
    position: fixed;
    bottom: 0;
    right: 0;
  }
`

export const SnackBarContent = styled.div `
  width: 50rem;
  height: 30rem;
  background-color: whitesmoke;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`