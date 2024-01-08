import styled from "styled-components"

export const ModalContent = styled.div`
  background: #ffffff;
  border-radius: 0.5rem;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  padding: 2rem;
  position: absolute;
  width: 75rem;
  height: 35rem;
`

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`
export const ModalTitle = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 1.2;
  margin-bottom: 0;
  margin-top: 0;
`
export const ModalBody = styled.div`
  padding: 1rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
  height: 23rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`
export const FormGroup = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
`

export const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  font-size: 1rem;
  line-height: 1.5;
`

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 1rem;
`

export const ColumnLeft = styled.div`
  flex: 50%;
  padding: 3rem;
`
export const ColumnRight = styled.div`
  flex: 50%;
  padding: 3rem;
`
export const Label = styled.label`
    margin-bottom: 0.5rem;
`