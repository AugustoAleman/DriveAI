import styled from "styled-components";

export const ContentCardContainer4 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
  height: 100%;
`;

export const ContentCardTitle4 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: left;
  width: 100%;
  gap: 20px;
  height: auto;
  h3 {
    margin:0;
`;

export const LabelNotes = styled.input`
  font-family: "Roboto", sans-serif;
  font-size: 1rem;
  font-weight: 500;
  color: #000000;
  height: 100%;
  width: 100%;
  margin: 0 0 10px 0;
  ::placeholder {
    color: #ccc; /* Change the placeholder text color */
    font-style: italic; /* Add italic style to the placeholder text */
  }
`;
