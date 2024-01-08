import styled from "styled-components";

export const AssignedItems = styled.div`
  background-color: rgb(67, 170, 139, 0.1);
`

export const UnassignedItems = styled.div`
  background-color: rgb(192, 192, 192, 0.1);
`


export const DealershipsListContainer = styled.div`
   display: flex;
   flex-direction: column;
  
  h3, h5 {
    margin: 0;
    align-self: flex-start;
  }
  
  li {
    border-radius: 5px;
  }
`

export const ManagerInfoContainer = styled.div`
  display: flex;
  gap: 5px;
  
  div {
    flex-grow: 1;
  }
  
  label {
    font-weight: bold;
  }
  
  label, p {
    margin: 0;
  }
`

export const EditManagerBox = styled.div `
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 5%;
  max-height: 60%;
  min-width: 50%;
`