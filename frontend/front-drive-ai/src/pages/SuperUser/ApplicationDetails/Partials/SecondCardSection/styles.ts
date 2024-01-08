import styled from "styled-components";

export const TableSecondCard = styled.table`
  width: 100%;
  padding: 5px 30px;
  height: 100%;
  th {
    font-size: 14px;
    font-weight: 600;
    color: #000000;
    text-align: center;
    padding: 12px 0;

    h3 {
      margin: 0;
    }
  }

  th:first-child {
    text-align: left;
    border-right: 1px solid #000000;
  }

  td {
    font-size: 14px;
    font-weight: 400;
    color: #000000;
    text-align: center;
    padding: 10px 0;
  }
`;

export const ContainerLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
