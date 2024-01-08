import styled from "styled-components"

export const GenericModalBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-height: 45%;
  min-width: 40%;
  background-color: #FFFFFF;
  border-radius: 10px;
`

export const backdropStyles = {
  backdrop: { style: {backgroundColor: "#E1E1E1", opacity: 0.2} }
}
