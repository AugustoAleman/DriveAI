import styled from "styled-components"

export const AssignedItems = styled.div`
  background-color: rgb(67, 170, 139, 0.1);
`

export const UnassignedItems = styled.div`
  background-color: rgb(192, 192, 192, 0.1);
`

export const DealershipsLists = styled.div`
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

export const AddManagerModalBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: 60%;
  min-width: 50%;
  background-color: #FFFFFF;
  border-radius: 10px;
  padding:  2rem 4rem;
  overflow-y: scroll;
  
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

export const FormButtonContainer = styled.div`
    align-self: flex-end;
`

export const ResponsiveStack = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  overflow-y: scroll;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`

export const ModalInput = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  flex-grow: 1;
`

export const ModalTitle = styled.div`
  display: flex;
  justify-content: space-between;
  h3 {
    margin: 0;
    font-size: 20px;
  }
`

export const backdropStyles = {
  backdrop: { style: {backgroundColor: "#E1E1E1", opacity: 0.2} }
}