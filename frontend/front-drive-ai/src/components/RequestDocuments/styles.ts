import styled from "styled-components";
import {ModalBoxProps, RequestDocumentDocContainerProps, RequestDocumentsComponentsBoxProps} from "./types";

export const RequestDocumentComponentBox = styled.div<RequestDocumentsComponentsBoxProps>`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 0.2rem;
  gap: 0.5rem;

  p {
    margin: 0;
  }
`

export const PaginationStyles =  styled.div`
  display: none;
  @media (max-width: 468px) {
    display: flex;
    align-items: center;
  }
`

export const OverflowComponent = styled.div`
  div:first-child {
    width: 100%;
    overflow-x: scroll;
  }

  @media (max-width: 468px) {
    display: none;
  }
`

export const RequestDocumentDocContainer = styled.div<RequestDocumentDocContainerProps>`
    min-width: 20%;
    max-width: 25%;

      div {
          display: flex;
          flex-direction: column;
          align-items: center;
      }

      .MuiModal-backdrop {
            background-color: #e7fdd8;
      }

      p {
            margin-top: 5px;
            font-size: 12px;
            font-weight: bold;
            word-break: break-word;
            text-align: center;
            ${props => props.verified === "approved" ? `color: ${props.status.correct}` : props.verified === "rejected" ? `color: ${props.status.wrong}` : "inherit"}
      }

      svg {
            font-size: 2rem;
      }

      @media (max-width: 800px) {
        min-height: auto;
        width: 80%;
        height: 60%;
      }
`

export const ModalBox = styled.div<ModalBoxProps>`
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      max-width: 60%;
      max-height: 80%;
      overflow-y: scroll;
      background-color: #FFFFFF;
      box-shadow: 2px ${({tertiary}) => tertiary.main};
      border-radius: 10px;
      padding:  1rem 2rem;

      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 1rem;

      p {
            margin: 0;
      }

      div:first-child {
            display: flex;
            justify-content: space-between;
            h3 {
                  margin: 0;
                  font-size: 20px;
            }
      }
  
      div:last-child {
            display: flex;
            align-self: flex-end;
            gap: 10px;
      }

      @media (max-width: 800px) {
        min-height: auto;
        width: 80%;
        height: 60%;
      }
`

export const DocumentActionsButtons = styled.div`
  button:first-child {
    background-color: #CBD0D0;
    margin-right: 1rem;
  }
  
  button:last-child {
    background-color: #4251F5;
    color: #FFFFFF;
  }
`

export const IFrameContainer = styled.div<ModalBoxProps>`
  max-height: 20%;
  max-width: 60%;
  overflow: hidden;
  box-shadow: 1px 1px 5px 1px ${({tertiary}) => tertiary.main};;
  position: relative;
  
  a {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  iframe {
    width:100%;
    height:100%;
    border: 0;
  }
  
`

export const backdropStyles = {
    backdrop: { style: {backgroundColor: "#E1E1E1", opacity: 0.2} },
    width: "100vw",
    height: "100vh"
}